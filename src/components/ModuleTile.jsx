import { Link } from 'react-router-dom'
import { MODULE_STATUS } from '../data/modules'
import ModuleIcon from './ModuleIcon'
import './ModuleTile.css'

function ModuleTile({ module, status, statusLabel }) {
  const resolvedStatus = status ?? module.status ?? MODULE_STATUS.NOT_STARTED
  const label = statusLabel ?? resolvedStatus
  const isCompleted = resolvedStatus === MODULE_STATUS.COMPLETED
  const isInProgress = resolvedStatus === MODULE_STATUS.IN_PROGRESS

  const className = [
    'module-tile',
    isCompleted ? 'module-tile--completed' : '',
    isInProgress ? 'module-tile--progress' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Link to={`/module/${module.id}`} className={className}>
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
      </span>

      <span className="module-tile__status">{label}</span>
    </Link>
  )
}

export default ModuleTile
