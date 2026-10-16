import { useState } from 'react'
import { loadChecklist, saveChecklist } from '../utils/checklistStorage'
import './Checklist.css'

function Checklist({ id, title, items = [] }) {
  const [checked, setChecked] = useState(() => loadChecklist(id))
  const doneCount = items.filter((item) => checked.includes(item)).length

  function toggle(item) {
    const next = checked.includes(item)
      ? checked.filter((value) => value !== item)
      : [...checked, item]
    setChecked(next)
    saveChecklist(id, next)
  }

  return (
    <section className="lesson-block checklist" aria-label={title ?? 'Checklist'}>
      <div className="checklist__header">
        {title ? <p className="lesson-block__label checklist__title">{title}</p> : null}
        <p className="checklist__count" aria-live="polite">
          {doneCount} van {items.length}
        </p>
      </div>
      <ul className="checklist__items">
        {items.map((item, index) => (
          <li key={index}>
            <label className="checklist__item">
              <input
                type="checkbox"
                checked={checked.includes(item)}
                onChange={() => toggle(item)}
              />
              <span>{item}</span>
            </label>
          </li>
        ))}
      </ul>
      <p className="checklist__note">Je vinkjes worden alleen op dit apparaat bewaard.</p>
    </section>
  )
}

export default Checklist
