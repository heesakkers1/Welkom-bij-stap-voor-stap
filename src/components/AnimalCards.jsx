import { useState } from 'react'
import RichText from './RichText'
import './AnimalCards.css'

/** Hulpvraag die je ziet zolang een vakje nog leeg is. */
const HINTS = {
  karakter: 'Hoe is dit dier? Rustig, nieuwsgierig, schrikachtig? Met wie staat het graag samen?',
  bijzonderheden: 'Leeftijd, medische bijzonderheden, apart voeren, beperking bij gras?',
  ditMag: 'Wat mogen collega’s zonder dierkennis doen?',
  ditNiet: 'Wat is alleen voor ervaren collega’s, of mag nooit?',
  metDeelnemers: 'Wat mogen deelnemers met dit dier doen? Geschikt voor coaching of groepsactiviteit?',
  waarschuwen: 'Bij wie meld je bijzonderheden over dit dier?',
}

function Field({ item, name, label, className = '' }) {
  const value = item[name]?.trim()
  return (
    <div className={`animal-card__row ${className}`}>
      <span className="animal-card__label">{label}</span>
      {value ? (
        <p className="animal-card__value"><RichText text={value} /></p>
      ) : (
        <p className="animal-card__todo">{HINTS[name]}</p>
      )}
    </div>
  )
}

/**
 * Knoppen met de namen van de dieren. Tik je op een naam, dan zie je de
 * dierenkaart van dat dier. Lege vakjes tonen een hulpvraag.
 */
function AnimalCards({ items = [] }) {
  const [open, setOpen] = useState(null)
  const item = open === null ? null : items[open]

  return (
    <section className="lesson-block animal-cards">
      <div className="animal-cards__names" role="group" aria-label="Kies een dier">
        {items.map((entry, index) => (
          <button
            key={index}
            type="button"
            className={`animal-cards__name${open === index ? ' is-active' : ''}`}
            aria-pressed={open === index}
            onClick={() => setOpen(open === index ? null : index)}
          >
            {entry.naam || `Dier ${index + 1}`}
          </button>
        ))}
      </div>

      {item ? (
        <article className="animal-card" aria-live="polite">
          <header className="animal-card__head">
            {item.src ? (
              <img className="animal-card__photo" src={item.src} alt={item.alt ?? ''} />
            ) : (
              <div className="animal-card__photo animal-card__photo--todo">foto<br />volgt</div>
            )}
            <div>
              <h3 className="animal-card__name">{item.naam}</h3>
              <p className="animal-card__sub">
                {item.leeftijd?.trim() ? <RichText text={item.leeftijd} /> : 'Leeftijd: nog in te vullen'}
              </p>
            </div>
          </header>
          <Field item={item} name="karakter" label="Karakter" />
          <Field item={item} name="bijzonderheden" label="Bijzonderheden en gezondheid" />
          <div className="animal-card__split">
            <Field item={item} name="ditMag" label="✓ Dit mag" className="animal-card__row--ok" />
            <Field item={item} name="ditNiet" label="✕ Dit niet" className="animal-card__row--no" />
          </div>
          <Field item={item} name="metDeelnemers" label="Met deelnemers" />
          <Field item={item} name="waarschuwen" label="Wie waarschuw je?" className="animal-card__row--alarm" />
        </article>
      ) : (
        <p className="animal-cards__hint">Tik op een naam om de kaart te zien.</p>
      )}
    </section>
  )
}

export default AnimalCards
