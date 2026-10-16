import content from './content.json'

export const MODULE_STATUS = {
  NOT_STARTED: 'Nog niet gestart',
  IN_PROGRESS: 'Bezig',
  COMPLETED: 'Afgerond',
  COMING_SOON: 'Binnenkort beschikbaar',
}

/**
 * Alle teksten van de site staan in content.json.
 * Je kunt ze in de browser aanpassen via /bewerken.
 */
export const siteTexts = content
export const modules = content.modules

export function isModuleAvailable(module) {
  return Boolean(module && !module.comingSoon && module.lessons?.length > 0)
}

export function getAvailableModules() {
  return modules.filter(isModuleAvailable)
}

export function getModuleById(moduleId) {
  return modules.find((module) => module.id === moduleId) ?? null
}

export function getModuleIndex(moduleId) {
  return modules.findIndex((module) => module.id === moduleId)
}

export function getAvailableModuleNumber(moduleId) {
  const available = getAvailableModules()
  const index = available.findIndex((module) => module.id === moduleId)
  return index === -1 ? null : index + 1
}

export function getLessonById(moduleId, lessonId) {
  const module = getModuleById(moduleId)
  if (!module) return null

  const lesson = module.lessons.find((item) => item.id === lessonId)
  if (!lesson) return null

  return { module, lesson }
}

export function getLessonNeighbors(moduleId, lessonId) {
  const module = getModuleById(moduleId)
  if (!module) return { previous: null, next: null }

  const index = module.lessons.findIndex((lesson) => lesson.id === lessonId)
  if (index === -1) return { previous: null, next: null }

  return {
    previous: module.lessons[index - 1] ?? null,
    next: module.lessons[index + 1] ?? null,
  }
}

export function lessonKey(moduleId, lessonId) {
  return `${moduleId}:${lessonId}`
}

export function parseLessonKey(key) {
  if (!key || typeof key !== 'string') return null
  const [moduleId, lessonId] = key.split(':')
  if (!moduleId || !lessonId) return null
  return { moduleId, lessonId }
}
