import { Link } from 'react-router-dom'
import { MODULE_STATUS } from '../data/modules'
import ModuleIcon from './ModuleIcon'
import './ModuleTile.css'

function ModuleTile({
  module,
  status,
  statusLabel,
  disabled = false,
  completedCount = 0,
  totalSteps = 0,
}) {
  const resolvedStatus = status ?? module.status ?? MODULE_STATUS.NOT_STARTED
  const label = statusLabel ?? resolvedStatus
  const isCompleted = resolvedStatus === MODULE_STATUS.COMPLETED
  const isInProgress = resolvedStatus === MODULE_STATUS.IN_PROGRESS
  const isComingSoon = resolvedStatus === MODULE_STATUS.COMING_SOON || disabled

  const className = [
    'module-tile',
    isCompleted ? 'module-tile--completed' : '',
    isInProgress ? 'module-tile--progress' : '',
    isComingSoon ? 'module-tile--soon' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const body = (
    <>
      <span className="module-tile__top">
        <span className="module-tile__icon-wrap">
          <ModuleIcon name={module.icon} />
        </span>
        {isCompleted ? (
          <span className="module-tile__check" aria-hidden="true">
            ✓
          </span>
        ) : null}
      </span>

      <span className="module-tile__body">
        <span className="module-tile__title">{module.title}</span>
        <span className="module-tile__description">{module.description}</span>
        {module.lessons?.length > 0 ? (
          <ul className="module-tile__topics" aria-label="Onderwerpen">
            {module.lessons.map((lesson) => (
              <li key={lesson.id} className="module-tile__topic">
                {lesson.title}
              </li>
            ))}
          </ul>
        ) : null}
      </span>

      {!isComingSoon && totalSteps > 0 ? (
        <span className="module-tile__meta">
          <span className="module-tile__steps">
            {completedCount} / {totalSteps} stappen
          </span>
        </span>
      ) : null}

      <span className="module-tile__status">{label}</span>
    </>
  )

  if (isComingSoon) {
    return (
      <div className={className} aria-disabled="true">
        {body}
      </div>
    )
  }

  return (
    <Link to={`/module/${module.id}`} className={className}>
      {body}
    </Link>
  )
}

export default ModuleTile
