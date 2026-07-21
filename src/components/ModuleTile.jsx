import ModuleIcon from './ModuleIcon'
import './ModuleTile.css'

function ModuleTile({ module, onSelect }) {
  return (
    <button
      type="button"
      className="module-tile"
      onClick={() => onSelect?.(module.id)}
    >
      <span className="module-tile__icon-wrap">
        <ModuleIcon name={module.icon} />
      </span>

      <span className="module-tile__body">
        <span className="module-tile__title">{module.title}</span>
        <span className="module-tile__description">{module.description}</span>
      </span>

      <span className="module-tile__status">{module.status}</span>
    </button>
  )
}

export default ModuleTile
