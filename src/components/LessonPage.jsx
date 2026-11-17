import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import {
  categories,
  getLessonById,
  getLessonNeighbors,
  isModuleAvailable,
} from '../data/modules'
import { useProgress } from '../context/ProgressContext'
import Header from './Header'
import LessonContent from './LessonContent'
import RichText from './RichText'
import './LessonPage.css'

function LessonPage() {
  const navigate = useNavigate()
  const { moduleId, lessonId } = useParams()
  const {
    markLessonOpened,
    markLessonCompleted,
    completeModule,
    isLessonCompleted,
  } = useProgress()
  // De stappenlijst klapt vanzelf weer dicht als je naar een andere stap gaat.
  const [stepsOpenFor, setStepsOpenFor] = useState(null)
  const showAllSteps = stepsOpenFor === lessonId

  const result = getLessonById(moduleId, lessonId)

  useEffect(() => {
    if (!moduleId || !lessonId) return
    if (!getLessonById(moduleId, lessonId)) return
    markLessonOpened(moduleId, lessonId)
    window.scrollTo(0, 0)
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
  const category = categories.find((item) => item.moduleIds.includes(module.id))
  const overviewState = { focusModule: module.id }
  const stepIndex = module.lessons.findIndex((item) => item.id === lesson.id)
  const stepNumber = stepIndex + 1
  const stepTotal = module.lessons.length
  const lessonPath = (id) => `/module/${module.id}/les/${id}`

  function goToNext() {
    markLessonCompleted(module.id, lesson.id)
    if (next) {
      navigate(lessonPath(next.id), { replace: true })
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
      <Header
        backTo="/"
        backLabel="Overzicht"
        backState={overviewState}
        eyebrow={category?.title}
        title={module.title}
      />

      {stepTotal > 1 ? (
      <nav className="step-nav" aria-label={`Stappen van ${module.title}`}>
        <ol className="step-nav__dots">
          {module.lessons.map((item, index) => {
            const done = isLessonCompleted(module.id, item.id)
            const current = item.id === lesson.id
            return (
              <li key={item.id}>
                <Link
                  to={lessonPath(item.id)}
                  replace
                  className={`step-nav__dot${done ? ' step-nav__dot--done' : ''}${
                    current ? ' step-nav__dot--current' : ''
                  }`}
                  aria-current={current ? 'step' : undefined}
                  aria-label={`Stap ${index + 1}: ${item.title}${done ? ' (afgerond)' : ''}`}
                  title={item.title}
                >
                  {done && !current ? '✓' : index + 1}
                </Link>
              </li>
            )
          })}
        </ol>

        <button
          type="button"
          className="step-nav__toggle"
          aria-expanded={showAllSteps}
          onClick={() => setStepsOpenFor(showAllSteps ? null : lessonId)}
        >
          <span className="step-nav__count">
            Stap {stepNumber} van {stepTotal}
          </span>
          <span className="step-nav__title">{lesson.title}</span>
          <span className="step-nav__chevron" aria-hidden="true">
            {showAllSteps ? '▴' : '▾'}
          </span>
        </button>

        {showAllSteps ? (
          <ol className="step-nav__list">
            {module.lessons.map((item, index) => {
              const done = isLessonCompleted(module.id, item.id)
              const current = item.id === lesson.id
              return (
                <li key={item.id}>
                  <Link
                    to={lessonPath(item.id)}
                    replace
                    className={`step-nav__item${current ? ' step-nav__item--current' : ''}`}
                    aria-current={current ? 'step' : undefined}
                  >
                    <span
                      className={`step-nav__item-index${done ? ' step-nav__item-index--done' : ''}`}
                    >
                      {done ? '✓' : index + 1}
                    </span>
                    <span className="step-nav__item-body">
                      <span className="step-nav__item-title">{item.title}</span>
                      {item.summary ? (
                        <span className="step-nav__item-summary">
                          <RichText text={item.summary} />
                        </span>
                      ) : null}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ol>
        ) : null}
      </nav>
      ) : null}

      <LessonContent blocks={lesson.content} lessonId={lesson.id} />

      <nav className="lesson-page__nav" aria-label="Stapnavigatie">
        {previous ? (
          <button
            type="button"
            className="lesson-page__nav-link"
            onClick={() => navigate(lessonPath(previous.id), { replace: true })}
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
