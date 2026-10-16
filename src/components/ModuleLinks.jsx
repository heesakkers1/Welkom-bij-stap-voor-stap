import { Link } from 'react-router-dom'
import { MODULE_STATUS, getLessonById, getModuleById } from '../data/modules'
import { useProgress } from '../context/ProgressContext'
import ModuleIcon from './ModuleIcon'
import './ModuleLinks.css'

/**
 * Een lijstje met links naar modules (of één les daarin), met per link
 * waarom je hem in deze fase doet en of je hem al hebt afgerond.
 */
function ModuleLinks({ items = [] }) {
  const { getModuleStatus, isLessonCompleted } = useProgress()

  return (
    <ul className="lesson-block module-links">
      {items.map(({ moduleId, lessonId, text }) => {
        const module = getModuleById(moduleId)
        if (!module) return null

        const lesson = lessonId ? getLessonById(moduleId, lessonId)?.lesson : null
        const status = getModuleStatus(module)
        const comingSoon = status === MODULE_STATUS.COMING_SOON
        const completed = lesson
          ? isLessonCompleted(module.id, lesson.id)
          : status === MODULE_STATUS.COMPLETED
        const title = lesson ? `${module.title}: ${lesson.title}` : module.title
        const path = lesson
          ? `/module/${module.id}/les/${lesson.id}`
          : `/module/${module.id}`

        const body = (
          <>
            <span className="module-links__icon">
              <ModuleIcon name={module.icon} />
            </span>
            <span className="module-links__body">
              <span className="module-links__title">{title}</span>
              {text ? <span className="module-links__text">{text}</span> : null}
            </span>
            {comingSoon ? (
              <span className="module-links__status">Binnenkort</span>
            ) : completed ? (
              <span className="module-links__status module-links__status--done">
                ✓ Afgerond
              </span>
            ) : null}
          </>
        )

        return (
          <li key={`${moduleId}-${lessonId ?? 'module'}`}>
            {comingSoon ? (
              <div className="module-links__item module-links__item--soon">{body}</div>
            ) : (
              <Link className="module-links__item" to={path}>
                {body}
              </Link>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default ModuleLinks
