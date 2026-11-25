import { useState } from 'react'
import RichText from './RichText'
import ZoomImage from './ZoomImage'
import './Timeline.css'

/**
 * Extra uitleg bij een stap. Standaard ingeklapt, zodat de hoofdlijn rustig blijft.
 * Eén tik op de knop laat alle extra uitleg van die stap zien.
 */
function TimelineExtras({ extras }) {
  const [open, setOpen] = useState(false)
  const titles = extras.map((extra) => extra.title).filter(Boolean)

  return (
    <div className="timeline__more">
      <button
        type="button"
        className="timeline__more-toggle"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="timeline__more-label">
          {open ? 'Minder uitleg' : 'Meer uitleg'}
          <span className="timeline__more-icon" aria-hidden="true">{open ? '▴' : '▾'}</span>
        </span>
        {!open && titles.length ? (
          <span className="timeline__more-titles">{titles.join(' · ')}</span>
        ) : null}
      </button>

      {open
        ? extras.map((extra, extraIndex) => (
            <div key={extraIndex} className="timeline__extra">
              {extra.title ? <p className="timeline__extra-title"><RichText text={extra.title} /></p> : null}
              {extra.text ? <p className="timeline__text"><RichText text={extra.text} /></p> : null}
              {extra.src && extra.zoom === false ? (
                <img className="timeline__img" src={extra.src} alt={extra.alt || ''} loading="lazy" />
              ) : null}
              {extra.src && extra.zoom !== false ? <ZoomImage src={extra.src} alt={extra.alt || ''} /> : null}
            </div>
          ))
        : null}
    </div>
  )
}

function Timeline({ items = [], variant }) {
  const steps = variant === 'steps'

  return (
    <ol className={steps ? 'timeline timeline--steps' : 'timeline'}>
      {items.map((item, index) => {
        const label = typeof item === 'string' ? item : item.title
        const text = typeof item === 'string' ? null : item.text
        // Bij genummerde stappen: "Stap 1: Afmelden" wordt een klein label "Stap 1" met de titel eronder.
        const stepMatch = steps && typeof label === 'string' ? label.match(/^(Stap\s+\d+)\s*:\s*(.+)$/i) : null

        return (
          <li key={`${label}-${index}`} className="timeline__item">
            <span className="timeline__dot" aria-hidden="true" />
            <div className="timeline__body">
              {stepMatch ? <p className="timeline__step">{stepMatch[1]}</p> : null}
              <p className="timeline__title"><RichText text={stepMatch ? stepMatch[2] : label} /></p>
              {text ? <p className="timeline__text"><RichText text={text} /></p> : null}
              {typeof item === 'object' && item.extraLink?.href ? (
                <a
                  className="timeline__link"
                  href={item.extraLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.extraLink.label || 'Meer info'} ↗
                </a>
              ) : null}
              {typeof item === 'object' && item.src ? (
                <ZoomImage src={item.src} alt={item.alt || label} />
              ) : null}
              {typeof item === 'object' && Array.isArray(item.extra) && item.extra.length ? (
                <TimelineExtras extras={item.extra} />
              ) : null}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export default Timeline
