import { useEffect, useRef, useState } from 'react'
import RichText from './RichText'
import './AnimalCards.css'
import './ColleagueCards.css'

/**
 * De paardenkaarten komen live uit het Digibord (alleen lezen).
 * Lukt ophalen niet, dan tonen we de kaarten uit content.json.
 */
const DIGIBORD_PAARDEN_URL = 'https://digibord.vercel.app/api/paardenkaarten'

const GESLACHT = { merrie: 'Merrie', ruin: 'Ruin' }

const tekst = (waarde) => String(waarde ?? '').trim()

/** 2026-11-16 → 16-11-2026 */
function datumNl(datum) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(tekst(datum))
  return m ? `${m[3]}-${m[2]}-${m[1]}` : ''
}

/** Een kaart uit het Digibord omzetten naar de vakjes van deze site. */
function vanDigibord(paard) {
  return {
    naam: tekst(paard.naam),
    geboortejaar: paard.geboortejaar ? String(paard.geboortejaar) : '',
    geslacht: GESLACHT[paard.geslacht] ?? '',
    ras: tekst(paard.ras),
    karakter: tekst(paard.karakter),
    bijzonderheden: tekst(paard.bijzonderheden),
    gezondheid: tekst(paard.gezondheidsklachten),
    gezondheidDatum: datumNl(paard.gezondheid_datum),
    gezondheidMag: tekst(paard.gezondheid_mag),
    gezondheidNiet: tekst(paard.gezondheid_niet),
    ditMag: tekst(paard.dit_mag),
    ditNiet: tekst(paard.dit_niet),
    metDeelnemers: tekst(paard.met_deelnemers),
    overig: tekst(paard.overige_opmerkingen),
    src: typeof paard.foto === 'string' && paard.foto.startsWith('https://') ? paard.foto : undefined,
    alt: paard.foto ? `Foto van ${tekst(paard.naam)}` : undefined,
  }
}

/** Kaarten uit content.json (oude vakjes) in dezelfde vorm. */
function vanContent(item) {
  return {
    naam: tekst(item.naam),
    leeftijd: tekst(item.leeftijd),
    karakter: tekst(item.karakter),
    gezondheid: tekst(item.bijzonderheden),
    ditMag: tekst(item.ditMag),
    ditNiet: tekst(item.ditNiet),
    metDeelnemers: tekst(item.metDeelnemers),
    src: item.src,
    alt: item.alt,
  }
}

function useDigibordPaarden() {
  const [paarden, setPaarden] = useState(null)
  useEffect(() => {
    let actief = true
    fetch(DIGIBORD_PAARDEN_URL)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data) => {
        const lijst = Array.isArray(data?.paarden) ? data.paarden.map(vanDigibord).filter((p) => p.naam) : []
        if (actief && lijst.length > 0) {
          lijst.sort((a, b) => a.naam.localeCompare(b.naam, 'nl', { sensitivity: 'base' }))
          setPaarden(lijst)
        }
      })
      .catch(() => {})
    return () => {
      actief = false
    }
  }, [])
  return paarden
}

function Field({ label, value, className = '', children }) {
  if (!value && !children) return null
  return (
    <div className={`animal-card__row ${className}`}>
      <span className="animal-card__label">{label}</span>
      {value ? <p className="animal-card__value"><RichText text={value} /></p> : null}
      {children}
    </div>
  )
}

function AnimalCard({ item, nav }) {
  const feiten = [
    item.geboortejaar && `Geboren in ${item.geboortejaar}`,
    item.leeftijd,
    item.geslacht,
    item.ras,
  ].filter(Boolean)
  const heeftGezondheid = item.gezondheid || item.gezondheidMag || item.gezondheidNiet
  const leeg = !item.bijzonderheden && !item.karakter && !heeftGezondheid && !item.ditMag && !item.ditNiet && !item.metDeelnemers && !item.overig

  return (
    <article className="animal-card" aria-live="polite">
      <header className="animal-card__head">
        {item.src ? <img className="animal-card__photo" src={item.src} alt={item.alt ?? ''} onError={(e) => { e.currentTarget.style.display = 'none' }} /> : null}
        <div>
          <h3 className="animal-card__name">{item.naam}</h3>
          {feiten.length > 0 ? <p className="animal-card__sub">{feiten.join(' · ')}</p> : null}
        </div>
      </header>
      {leeg ? (
        <p className="animal-card__todo animal-card__empty">Over dit paard is nog niets ingevuld. Vraag het aan Anne S of Elske.</p>
      ) : null}
      <Field label="Bijzonderheden" value={item.bijzonderheden} />
      <Field label="Karakter" value={item.karakter} />
      {heeftGezondheid ? (
        <Field label={item.gezondheidDatum ? `Gezondheid (sinds ${item.gezondheidDatum})` : 'Gezondheid'} value={item.gezondheid} className="animal-card__row--alarm">
          {item.gezondheidMag ? <p className="animal-card__value"><strong>✓ Wel:</strong> <RichText text={item.gezondheidMag} /></p> : null}
          {item.gezondheidNiet ? <p className="animal-card__value"><strong>✕ Niet:</strong> <RichText text={item.gezondheidNiet} /></p> : null}
        </Field>
      ) : null}
      {item.ditMag || item.ditNiet ? (
        <p className="animal-card__section">In het algemeen geldt voor dit paard:</p>
      ) : null}
      {item.ditMag || item.ditNiet ? (
        <div className="animal-card__split">
          <Field label="✓ Dit mag" value={item.ditMag} className="animal-card__row--ok" />
          <Field label="✕ Dit niet" value={item.ditNiet} className="animal-card__row--no" />
        </div>
      ) : null}
      <Field label="Met deelnemers" value={item.metDeelnemers} />
      <Field label="Overige opmerkingen" value={item.overig} />
      {nav}
    </article>
  )
}

/**
 * Knoppen met de namen van de paarden. Tik je op een naam, dan zie je de
 * kaart van dat paard. Alleen ingevulde vakjes worden getoond.
 */
function AnimalCards({ items = [] }) {
  const live = useDigibordPaarden()
  const kaarten = live ?? items.map(vanContent)
  const [openNaam, setOpenNaam] = useState(null)
  const index = kaarten.findIndex((k) => k.naam === openNaam)
  const item = index >= 0 ? kaarten[index] : null
  const cardRef = useRef(null)
  const namesRef = useRef(null)

  useEffect(() => {
    if (openNaam !== null && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [openNaam])

  const terugNaarAlle = () => {
    setOpenNaam(null)
    namesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const nav = item ? (
    <nav className="colleague-card__nav" aria-label="Andere paarden">
      <button type="button" className="colleague-card__navbtn" disabled={index === 0} onClick={() => setOpenNaam(kaarten[index - 1].naam)}>
        ← Vorige
      </button>
      <button type="button" className="colleague-card__navbtn" disabled={index === kaarten.length - 1} onClick={() => setOpenNaam(kaarten[index + 1].naam)}>
        Volgende →
      </button>
      <button type="button" className="colleague-card__navbtn colleague-card__navbtn--all" onClick={terugNaarAlle}>
        ↑ Terug naar alle paarden
      </button>
    </nav>
  ) : null

  return (
    <section className="lesson-block animal-cards">
      <div ref={namesRef} className="animal-cards__names" role="group" aria-label="Kies een paard">
        {kaarten.map((entry, index) => (
          <button
            key={`${entry.naam}-${index}`}
            type="button"
            className={`animal-cards__name${openNaam === entry.naam ? ' is-active' : ''}`}
            aria-pressed={openNaam === entry.naam}
            onClick={() => setOpenNaam(openNaam === entry.naam ? null : entry.naam)}
          >
            {entry.naam || `Paard ${index + 1}`}
          </button>
        ))}
      </div>

      {item ? <div ref={cardRef} className="animal-cards__card"><AnimalCard item={item} nav={nav} /></div> : <p className="animal-cards__hint">Tik op een naam om de kaart te zien.</p>}
    </section>
  )
}

export default AnimalCards
