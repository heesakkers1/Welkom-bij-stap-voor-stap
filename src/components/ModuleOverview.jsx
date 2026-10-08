import { Link, Navigate, useParams } from 'react-router-dom'
import { getModuleById, isModuleAvailable } from '../data/modules'
import { useProgress } from '../context/ProgressContext'
import Header from './Header'
import ProgressBar from './ProgressBar'
import './ModuleOverview.css'

function ModuleOverview() {
  const { moduleId } = useParams()
  const module = getModuleById(moduleId)
  const { getModuleProgressPercent, isLessonCompleted } = useProgress()

  if (!module) {
    return (
      <main className="module-overview">
        <Header title="Module niet gevonden" />
        <p className="module-overview__empty">
          Deze module bestaat niet. Ga met de homeknop terug naar de startpagina.
        </p>
      </main>
    )
  }

  if (!isModuleAvailable(module)) {
    return <Navigate to="/" replace />
  }

  const progress = getModuleProgressPercent(module)

  return (
    <main className="module-overview">
      <Header title={module.title} />

      <section className="module-overview__intro">
        <p>{module.description}</p>
        {module.duration ? (
          <p className="module-overview__duration">⏱ {module.duration}</p>
        ) : null}
        <ProgressBar value={progress} label="Voortgang in deze module" />
      </section>

      <section className="module-overview__lessons" aria-label="Stappen">
        <h2>Stappen</h2>

        <ol className="module-overview__list">
          {module.lessons.map((lesson, index) => {
            const done = isLessonCompleted(module.id, lesson.id)

            return (
              <li key={lesson.id}>
                <Link
                  to={`/module/${module.id}/les/${lesson.id}`}
                  className={`module-overview__lesson${done ? ' module-overview__lesson--done' : ''}`}
                >
                  <span className="module-overview__lesson-index">
                    {done ? '✓' : index + 1}
                  </span>
                  <span className="module-overview__lesson-body">
                    <span className="module-overview__lesson-title">
                      {lesson.title}
                    </span>
                    {lesson.summary ? (
                      <span className="module-overview__lesson-summary">
                        {lesson.summary}
                      </span>
                    ) : null}
                  </span>
                </Link>
              </li>
            )
          })}
        </ol>
      </section>
    </main>
  )
}

export default ModuleOverview
