import { useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import {
  getAvailableModuleNumber,
  getLessonById,
  getLessonNeighbors,
  isModuleAvailable,
} from '../data/modules'
import { useProgress } from '../context/ProgressContext'
import Header from './Header'
import ProgressBar from './ProgressBar'
import LessonContent from './LessonContent'
import './LessonPage.css'

function LessonPage() {
  const navigate = useNavigate()
  const { moduleId, lessonId } = useParams()
  const {
    markLessonOpened,
    markLessonCompleted,
    completeModule,
    getModuleProgressPercent,
  } = useProgress()

  const result = getLessonById(moduleId, lessonId)

  useEffect(() => {
    if (!moduleId || !lessonId) return
    if (!getLessonById(moduleId, lessonId)) return
    markLessonOpened(moduleId, lessonId)
  }, [moduleId, lessonId, markLessonOpened])

  if (!result) {
    return (
      <main className="lesson-page">
        <Header title="Les niet gevonden" />
        <p className="lesson-page__missing">
          Deze les bestaat niet. Ga met de homeknop terug naar de startpagina
          of kies een andere module.
        </p>
      </main>
    )
  }

  if (!isModuleAvailable(result.module)) {
    return <Navigate to="/" replace />
  }

  const { module, lesson } = result
  const { previous, next } = getLessonNeighbors(moduleId, lessonId)
  const modulePath = `/module/${module.id}`
  const moduleNumber = getAvailableModuleNumber(module.id) ?? 1
  const stepIndex = module.lessons.findIndex((item) => item.id === lesson.id)
  const stepNumber = stepIndex + 1
  const stepTotal = module.lessons.length
  const moduleProgress = getModuleProgressPercent(module)

  function goToNext() {
    markLessonCompleted(module.id, lesson.id)
    if (next) {
      navigate(`/module/${module.id}/les/${next.id}`)
    }
  }

  function finishModule() {
    completeModule(module.id)
    navigate('/', {
      state: {
        completionMessage: module.completionMessage ?? {
          title: '✓ Module afgerond',
          text: 'Goed gedaan. Je kunt verder op de startpagina.',
        },
      },
    })
  }

  return (
    <main className="lesson-page">
      <Header title={lesson.title} backTo={modulePath} />

      <section className="lesson-page__progress" aria-label="Modulevoortgang">
        <p className="lesson-page__meta">
          <span>Module {moduleNumber}</span>
          <span aria-hidden="true">·</span>
          <span>
            Stap {stepNumber} van {stepTotal}
          </span>
        </p>
        <ProgressBar value={moduleProgress} label={module.title} />
      </section>

      <LessonContent blocks={lesson.content} lessonId={lesson.id} />

      <nav className="lesson-page__nav" aria-label="Stapnavigatie">
        {previous ? (
          <button
            type="button"
            className="lesson-page__nav-link"
            onClick={() =>
              navigate(`/module/${module.id}/les/${previous.id}`)
            }
          >
            ← Vorige stap
          </button>
        ) : (
          <span />
        )}

        {next ? (
          <button
            type="button"
            className="lesson-page__nav-primary"
            onClick={goToNext}
          >
            Volgende stap →
          </button>
        ) : (
          <button
            type="button"
            className="lesson-page__nav-primary"
            onClick={finishModule}
          >
            ✓ Module afronden
          </button>
        )}
      </nav>
    </main>
  )
}

export default LessonPage
