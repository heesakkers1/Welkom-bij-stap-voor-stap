import { useEffect, useState } from 'react'
import { voorbereidingFields, voorbereidingGroups, voorbereidingItemIds } from '../data/voorbereiding'
import {
  emptyVoorbereiding,
  hasVoorbereidingContent,
  loadLastVoorbereiding,
  parseVoorbereiding,
  saveLastVoorbereiding,
  voorbereidingToHash,
} from '../utils/voorbereidingState'
import ProgressBar from '../components/ProgressBar'
import MessageComposer from '../components/MessageComposer'
import '../components/Checklist.css'
import './Voorbereiding.css'

function formatDate(iso) {
  const date = new Date(`${iso}T12:00:00`)
  if (!iso || Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long' })
}

function introLine(state) {
  const who = state.naam || 'een nieuwe collega'
  const role = state.functie ? ` als ${state.functie}` : ''
  if (state.start) return `Op ${formatDate(state.start)} begint ${who}${role} bij Stap voor Stap.`
  return `Binnenkort begint ${who}${role} bij Stap voor Stap.`
}

function greeting(name) {
  return name ? `Hoi ${name}!` : 'Hoi!'
}

function Voorbereiding() {
  const [state, setState] = useState(() => parseVoorbereiding(window.location.hash))
  const [lastState, setLastState] = useState(() =>
    hasVoorbereidingContent(parseVoorbereiding(window.location.hash))
      ? null
      : loadLastVoorbereiding(),
  )

  // De link in de adresbalk bevat altijd de checklist zoals hij nu is.
  useEffect(() => {
    const url = `${window.location.pathname}${voorbereidingToHash(state)}`
    window.history.replaceState(window.history.state, '', url)
    if (hasVoorbereidingContent(state)) saveLastVoorbereiding(state)
  }, [state])

  // Plak je een nieuwe link in hetzelfde tabblad, dan laden we die.
  useEffect(() => {
    const onHashChange = () => setState(parseVoorbereiding(window.location.hash))
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Voorbereiding nieuwe collega · Stap voor Stap'
    return () => {
      document.title = previousTitle
    }
  }, [])

  const link = `${window.location.origin}/voorbereiding${voorbereidingToHash(state)}`
  const doneCount = voorbereidingItemIds.filter((id) => state.klaar.includes(id)).length
  const totalCount = voorbereidingItemIds.length
  const allDone = doneCount === totalCount
  const naam = state.naam || 'de nieuwe collega'
  const subject = `Voorbereiding nieuwe collega${state.naam ? `: ${state.naam}` : ''}`
  const showResume = lastState && hasVoorbereidingContent(lastState) && !hasVoorbereidingContent(state)

  function setField(id, value) {
    setState((current) => ({ ...current, [id]: value }))
  }

  function toggle(id) {
    setState((current) => ({
      ...current,
      klaar: current.klaar.includes(id)
        ? current.klaar.filter((value) => value !== id)
        : [...current.klaar, id],
    }))
  }

  function startOver() {
    if (!window.confirm('Weet je zeker dat je een nieuwe, lege checklist wilt beginnen?')) return
    saveLastVoorbereiding(emptyVoorbereiding)
    setLastState(null)
    setState({ ...emptyVoorbereiding })
  }

  function askText(group) {
    return [
      `${greeting(group.askName)} ${introLine(state)}`,
      `Wil jij ${group.askTask(state)}? Vink het af in de checklist en stuur hem daarna terug naar ${state.leidinggevende || 'de leidinggevende'}:`,
      link,
    ].join('\n\n')
  }

  const backText = [
    `${greeting(state.leidinggevende)} Mijn deel van de voorbereiding voor ${naam} is klaar. Hier zie je de checklist:`,
    link,
  ].join('\n\n')

  const readyText = [
    `${greeting(state.aanspreekpunt)} Alles staat klaar voor de eerste werkdag van ${naam}${
      state.start ? ` op ${formatDate(state.start)}` : ''
    }. Jij bent het vaste aanspreekpunt van ${naam}. Hier zie je de checklist:`,
    link,
  ].join('\n\n')

  return (
    <main className="voorbereiding">
      <header className="voorbereiding__header">
        <p className="voorbereiding__brand">Team Stap voor Stap</p>
        <h1>Voorbereiding nieuwe collega</h1>
        <p>
          Met deze checklist weet iedereen wat er geregeld moet zijn vóór de
          eerste werkdag. De leidinggevende begint uiterlijk 30 dagen voor de
          start.
        </p>
        <ol className="voorbereiding__how">
          <li>Vul de gegevens van de nieuwe collega in.</li>
          <li>Vink af wat jij hebt gedaan.</li>
          <li>Stuur de checklist met een berichtje door naar de volgende collega.</li>
        </ol>
      </header>

      {showResume ? (
        <div className="voorbereiding__resume" role="status">
          <p>
            Je was bezig met de checklist
            {lastState.naam ? ` voor ${lastState.naam}` : ''}.
          </p>
          <button
            type="button"
            className="voorbereiding__resume-button"
            onClick={() => {
              setState(lastState)
              setLastState(null)
            }}
          >
            Verder met die checklist
          </button>
        </div>
      ) : null}

      <section className="voorbereiding__card" aria-labelledby="voorbereiding-gegevens">
        <h2 id="voorbereiding-gegevens">Gegevens</h2>
        <div className="voorbereiding__fields">
          {voorbereidingFields.map((field) => (
            <label key={field.id} className="voorbereiding__field">
              <span>{field.label}</span>
              <input
                type={field.type}
                value={state[field.id]}
                min={field.type === 'number' ? 1 : undefined}
                maxLength={80}
                onChange={(event) => setField(field.id, event.target.value)}
              />
            </label>
          ))}
        </div>
      </section>

      <ProgressBar
        value={Math.round((doneCount / totalCount) * 100)}
        label={`${doneCount} van ${totalCount} klaar`}
      />

      {voorbereidingGroups.map((group) => {
        const groupDone = group.items.filter((item) => state.klaar.includes(item.id)).length
        return (
          <section
            key={group.id}
            className="voorbereiding__card"
            aria-labelledby={`voorbereiding-${group.id}`}
          >
            <div className="checklist__header">
              <h2 id={`voorbereiding-${group.id}`}>{group.who}</h2>
              <p className="checklist__count" aria-live="polite">
                {groupDone} van {group.items.length}
              </p>
            </div>
            <ul className="checklist__items">
              {group.items.map((item) => (
                <li key={item.id}>
                  <label className="checklist__item">
                    <input
                      type="checkbox"
                      checked={state.klaar.includes(item.id)}
                      onChange={() => toggle(item.id)}
                    />
                    <span>{item.text}</span>
                  </label>
                </li>
              ))}
            </ul>
            {group.askTask && groupDone < group.items.length ? (
              <MessageComposer
                label={`Vraag ${group.askName || 'een collega'} om dit te regelen`}
                subject={subject}
                text={askText(group)}
              />
            ) : null}
          </section>
        )
      })}

      <section
        className={`voorbereiding__card voorbereiding__card--send${allDone ? ' is-done' : ''}`}
        aria-labelledby="voorbereiding-doorsturen"
      >
        {allDone ? (
          <>
            <h2 id="voorbereiding-doorsturen">🎉 Alles staat klaar voor {naam}!</h2>
            <p>Laat het vaste aanspreekpunt weten dat de nieuwe collega kan beginnen.</p>
            <MessageComposer
              key="klaar"
              label={`Stuur een berichtje naar ${state.aanspreekpunt || 'het vaste aanspreekpunt'}`}
              subject={subject}
              text={readyText}
            />
          </>
        ) : (
          <>
            <h2 id="voorbereiding-doorsturen">Klaar met jouw deel?</h2>
            <p>
              Stuur de checklist terug naar {state.leidinggevende || 'de leidinggevende'}.
              Die ziet dan meteen wat er al gedaan is.
            </p>
            <MessageComposer
              key="terug"
              label="Stuur de checklist terug"
              subject={subject}
              text={backText}
            />
          </>
        )}
      </section>

      <footer className="voorbereiding__footer">
        <p>
          De gegevens en vinkjes zitten in de link van deze pagina en worden
          niet op een server bewaard. Stuur dus altijd de nieuwste link door.
        </p>
        <button type="button" className="voorbereiding__reset" onClick={startOver}>
          Nieuwe checklist beginnen
        </button>
      </footer>
    </main>
  )
}

export default Voorbereiding
