import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  MODULE_STATUS,
  getAvailableModules,
  getLessonById,
  isModuleAvailable,
  lessonKey,
  modules,
  parseLessonKey,
} from '../data/modules'

const STORAGE_KEY = 'stap-voor-stap-progress'

const emptyProgress = {
  openedLessons: [],
  completedLessons: [],
  completedModules: [],
  welcomeSeen: false,
  lastOpenedLesson: null,
}

const ProgressContext = createContext(null)

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyProgress

    const parsed = JSON.parse(raw)
    return {
      openedLessons: Array.isArray(parsed.openedLessons) ? parsed.openedLessons : [],
      completedLessons: Array.isArray(parsed.completedLessons)
        ? parsed.completedLessons
        : [],
      completedModules: Array.isArray(parsed.completedModules)
        ? parsed.completedModules
        : [],
      welcomeSeen: Boolean(parsed.welcomeSeen),
      lastOpenedLesson:
        typeof parsed.lastOpenedLesson === 'string' ? parsed.lastOpenedLesson : null,
    }
  } catch {
    return emptyProgress
  }
}

function uniquePush(list, value) {
  return list.includes(value) ? list : [...list, value]
}

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(loadProgress)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  const markWelcomeSeen = useCallback(() => {
    setProgress((current) => ({
      ...current,
      welcomeSeen: true,
    }))
  }, [])

  const markLessonOpened = useCallback((moduleId, lessonId) => {
    const key = lessonKey(moduleId, lessonId)
    setProgress((current) => ({
      ...current,
      openedLessons: uniquePush(current.openedLessons, key),
      lastOpenedLesson: key,
    }))
  }, [])

  const markLessonCompleted = useCallback((moduleId, lessonId) => {
    const key = lessonKey(moduleId, lessonId)
    setProgress((current) => ({
      ...current,
      openedLessons: uniquePush(current.openedLessons, key),
      completedLessons: uniquePush(current.completedLessons, key),
      lastOpenedLesson: key,
    }))
  }, [])

  const completeModule = useCallback((moduleId) => {
    const module = modules.find((item) => item.id === moduleId)
    if (!module) return

    setProgress((current) => {
      let openedLessons = [...current.openedLessons]
      let completedLessons = [...current.completedLessons]

      for (const lesson of module.lessons) {
        const key = lessonKey(moduleId, lesson.id)
        openedLessons = uniquePush(openedLessons, key)
        completedLessons = uniquePush(completedLessons, key)
      }

      return {
        ...current,
        openedLessons,
        completedLessons,
        completedModules: uniquePush(current.completedModules, moduleId),
      }
    })
  }, [])

  const resetProgress = useCallback(() => {
    setProgress(emptyProgress)
  }, [])

  const isLessonOpened = useCallback(
    (moduleId, lessonId) =>
      progress.openedLessons.includes(lessonKey(moduleId, lessonId)),
    [progress.openedLessons],
  )

  const isLessonCompleted = useCallback(
    (moduleId, lessonId) =>
      progress.completedLessons.includes(lessonKey(moduleId, lessonId)),
    [progress.completedLessons],
  )

  const isModuleCompleted = useCallback(
    (moduleId) => progress.completedModules.includes(moduleId),
    [progress.completedModules],
  )

  const getModuleStatus = useCallback(
    (module) => {
      if (!isModuleAvailable(module)) {
        return MODULE_STATUS.COMING_SOON
      }

      if (progress.completedModules.includes(module.id)) {
        return MODULE_STATUS.COMPLETED
      }

      const hasActivity = module.lessons.some((lesson) => {
        const key = lessonKey(module.id, lesson.id)
        return (
          progress.openedLessons.includes(key) ||
          progress.completedLessons.includes(key)
        )
      })

      return hasActivity ? MODULE_STATUS.IN_PROGRESS : MODULE_STATUS.NOT_STARTED
    },
    [progress],
  )

  const getCompletedLessonCount = useCallback(
    (module) =>
      module.lessons.filter((lesson) =>
        progress.completedLessons.includes(lessonKey(module.id, lesson.id)),
      ).length,
    [progress.completedLessons],
  )

  const getModuleProgressPercent = useCallback(
    (module) => {
      const total = module.lessons.length
      if (total === 0) return 0
      return Math.round((getCompletedLessonCount(module) / total) * 100)
    },
    [getCompletedLessonCount],
  )

  const overallProgressPercent = useMemo(() => {
    const available = getAvailableModules()
    let total = 0
    let done = 0

    for (const module of available) {
      total += module.lessons.length
      for (const lesson of module.lessons) {
        if (progress.completedLessons.includes(lessonKey(module.id, lesson.id))) {
          done += 1
        }
      }
    }

    return total === 0 ? 0 : Math.round((done / total) * 100)
  }, [progress])

  const hasStarted = useMemo(() => {
    return getAvailableModules().some((module) => {
      if (progress.completedModules.includes(module.id)) return true
      return module.lessons.some((lesson) => {
        const key = lessonKey(module.id, lesson.id)
        return (
          progress.openedLessons.includes(key) ||
          progress.completedLessons.includes(key)
        )
      })
    })
  }, [progress])

  const getResumeInfo = useCallback(() => {
    const available = getAvailableModules()

    const fromLast = parseLessonKey(progress.lastOpenedLesson)
    if (fromLast) {
      const module = available.find((item) => item.id === fromLast.moduleId)
      if (module && !progress.completedModules.includes(module.id)) {
        const incomplete = module.lessons.find(
          (lesson) =>
            !progress.completedLessons.includes(lessonKey(module.id, lesson.id)),
        )
        const lesson = incomplete ?? getLessonById(module.id, fromLast.lessonId)?.lesson
        if (lesson) {
          return {
            path: `/module/${module.id}/les/${lesson.id}`,
            label: `${module.title} · ${lesson.title}`,
          }
        }
      }
    }

    for (const module of available) {
      if (progress.completedModules.includes(module.id)) continue

      const incomplete = module.lessons.find(
        (lesson) =>
          !progress.completedLessons.includes(lessonKey(module.id, lesson.id)),
      )
      const lesson = incomplete ?? module.lessons[0]
      if (!lesson) continue

      return {
        path: `/module/${module.id}/les/${lesson.id}`,
        label: `${module.title} · ${lesson.title}`,
      }
    }

    return null
  }, [progress])

  const value = useMemo(
    () => ({
      progress,
      welcomeSeen: progress.welcomeSeen,
      markWelcomeSeen,
      markLessonOpened,
      markLessonCompleted,
      completeModule,
      resetProgress,
      isLessonOpened,
      isLessonCompleted,
      isModuleCompleted,
      getModuleStatus,
      getCompletedLessonCount,
      getModuleProgressPercent,
      overallProgressPercent,
      hasStarted,
      getResumeInfo,
    }),
    [
      progress,
      markWelcomeSeen,
      markLessonOpened,
      markLessonCompleted,
      completeModule,
      resetProgress,
      isLessonOpened,
      isLessonCompleted,
      isModuleCompleted,
      getModuleStatus,
      getCompletedLessonCount,
      getModuleProgressPercent,
      overallProgressPercent,
      hasStarted,
      getResumeInfo,
    ],
  )

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  )
}

/* eslint-disable react-refresh/only-export-components -- useProgress hoort bij deze Provider */
export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider')
  }
  return context
}
