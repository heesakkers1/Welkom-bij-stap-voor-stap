import { useState } from 'react'
import RichText from './RichText'
import './AnimalCards.css'

/** Hulpvraag die je ziet zolang een vakje nog leeg is. */
const HINTS = {
  karakter: 'Hoe is dit dier? Rustig, nieuwsgierig, schrikachtig? Met wie staat het graag samen?',
  bijzonderheden: 'Medische bijzonderheden, apart voeren, beperking bij gras?',
  ditMag: 'Wat mogen collega’s zonder dierkennis doen?',
  ditNiet: 'Wat is alleen voor ervaren collega’s, of mag nooit?',
  metDeelnemers: 'Wat mogen deelnemers met dit dier doen? Geschikt voor coaching of groepsactiviteit?',
  rijden: 'Mag er op gereden worden? Zo ja, ook door beginners?',
  naarBos: 'Mag het mee naar het bos? Waar let je dan op?',
  rijdenBos: 'Mag er in het bos gereden worden? Waar let je dan op?',
  verplaatsen: 'Mag een deelnemer dit paard uit de paddock of wei halen? Waar let je op?',
  gangen: 'Welke gangen mogen: stap, draf, galop?',
  hoeveelheid: 'Hoe lang of hoe vaak mag een gang, of waar let je bij een gang op?',
  longeren: 'Waar let je op bij het longeren?',
  roundpen: 'Waar let je op in de roundpen?',
  paardenbak: 'Waar let je op in de paardenbak?',
}

/** Regel onder de naam, zoals "Geboren in 2012 · Merrie". */
function subtitle(item) {
  const jaar = item.geboortejaar?.trim()
  const geslacht = item.geslacht?.trim()
  const parts = [jaar ? `Geboren in ${jaar}` : 'Geboortejaar: nog in te vullen']
  if (geslacht) parts.push(geslacht)
  return parts.join(' · ')
}

function Group({ title, children }) {
  return (
    <>
      <p className="animal-card__group">{title}</p>
      {children}
    </>
  )
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
              <p className="animal-card__sub">{subtitle(item)}</p>
            </div>
          </header>
          <Field item={item} name="karakter" label="Karakter" />
          <Field item={item} name="bijzonderheden" label="Bijzonderheden en gezondheid" />
          <Group title="Rijden en naar buiten">
            <Field item={item} name="rijden" label="Rijden" />
            <Field item={item} name="naarBos" label="Mee naar het bos" />
            <Field item={item} name="rijdenBos" label="Rijden in het bos" />
            <Field item={item} name="gangen" label="Gangen" />
            <Field item={item} name="hoeveelheid" label="Toelichting over een gang" />
          </Group>
          <Group title="Waar let je op?">
            <Field item={item} name="longeren" label="Longeren" />
            <Field item={item} name="roundpen" label="In de roundpen" />
            <Field item={item} name="paardenbak" label="In de paardenbak" />
            <Field item={item} name="verplaatsen" label="Verplaatsen (paddock of wei)" />
          </Group>
          <div className="animal-card__split">
            <Field item={item} name="ditMag" label="✓ Dit mag" className="animal-card__row--ok" />
            <Field item={item} name="ditNiet" label="✕ Dit niet" className="animal-card__row--no" />
          </div>
          <Field item={item} name="metDeelnemers" label="Met deelnemers" />
        </article>
      ) : (
        <p className="animal-cards__hint">Tik op een naam om de kaart te zien.</p>
      )}
    </section>
  )
}

export default AnimalCards
