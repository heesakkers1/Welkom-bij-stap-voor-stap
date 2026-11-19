import { useEffect, useRef, useState } from 'react'
import RichText from './RichText'
import './ColleagueCards.css'

/**
 * Tegeltjes met een foto en naam van elke collega. Tik je op een tegeltje,
 * dan zie je op dezelfde pagina de kennismakingskaart van die collega.
 */
function ColleagueCards({ items = [] }) {
  const [open, setOpen] = useState(null)
  const cardRef = useRef(null)
  const gridRef = useRef(null)
  const item = open === null ? null : items[open]

  useEffect(() => {
    if (open !== null && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [open])

  const backToOverview = () => {
    setOpen(null)
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const paragraphs = (item?.tekst ?? '')
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean)

  return (
    <section className="lesson-block colleague-cards">
      <div className="colleague-cards__grid" ref={gridRef} role="group" aria-label="Kies een collega">
        {items.map((entry, index) => (
          <button
            key={index}
            type="button"
            className={`colleague-tile${open === index ? ' is-active' : ''}`}
            aria-pressed={open === index}
            onClick={() => setOpen(open === index ? null : index)}
          >
            {entry.src ? (
              <img className="colleague-tile__photo" src={entry.src} alt="" loading="lazy" />
            ) : (
              <span className="colleague-tile__photo colleague-tile__photo--empty" aria-hidden="true">
                {(entry.naam || '?').charAt(0)}
              </span>
            )}
            <span className="colleague-tile__name">{entry.naam}</span>
            {entry.functie ? <span className="colleague-tile__role">{entry.functie}</span> : null}
          </button>
        ))}
      </div>

      {item ? (
        <article className="colleague-card" ref={cardRef} aria-live="polite">
          <header className="colleague-card__head">
            {item.src ? (
              <img className="colleague-card__photo" src={item.src} alt={item.alt ?? ''} />
            ) : null}
            <div>
              <h3 className="colleague-card__name">{item.naam}</h3>
              {item.functie ? <p className="colleague-card__role">{item.functie}</p> : null}
              {item.werkzaamSinds ? (
                <p className="colleague-card__since">{item.werkzaamSinds}</p>
              ) : null}
            </div>
          </header>
          <div className="colleague-card__body">
            {paragraphs.map((text, index) => (
              <p key={index}><RichText text={text} /></p>
            ))}
            {item.afsluiting?.trim() ? (
              <aside className="colleague-card__closing"><RichText text={item.afsluiting} /></aside>
            ) : null}
          </div>
          <nav className="colleague-card__nav" aria-label="Andere collega's">
            <button
              type="button"
              className="colleague-card__navbtn"
              disabled={open === 0}
              onClick={() => setOpen(open - 1)}
            >
              ← Vorige
            </button>
            <button
              type="button"
              className="colleague-card__navbtn"
              disabled={open === items.length - 1}
              onClick={() => setOpen(open + 1)}
            >
              Volgende →
            </button>
            <button
              type="button"
              className="colleague-card__navbtn colleague-card__navbtn--all"
              onClick={backToOverview}
            >
              ↑ Terug naar alle collega's
            </button>
          </nav>
        </article>
      ) : (
        <p className="colleague-cards__hint">Tik op een collega om kennis te maken.</p>
      )}
    </section>
  )
}

export default ColleagueCards
