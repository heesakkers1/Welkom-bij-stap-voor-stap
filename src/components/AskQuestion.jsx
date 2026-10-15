import { useEffect, useId, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ModuleIcon from './ModuleIcon'
import { askQuestion } from '../data/askQuestion'
import './AskQuestion.css'

function AskQuestion() {
  const { pathname } = useLocation()
  // Het paneel sluit vanzelf zodra je naar een andere pagina gaat.
  const [openOn, setOpenOn] = useState(null)
  const open = openOn === pathname
  const setOpen = (value) => setOpenOn(value ? pathname : null)
  const panelId = useId()
  const toggleRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpenOn(null)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  if (pathname === '/intro') return null

  return (
    <div className="ask-question">
      {open ? (
        <section id={panelId} className="ask-question__panel" aria-label="Vraag stellen">
          <h2 className="ask-question__title">Heb je een vraag?</h2>
          <p className="ask-question__text">
            Stel hem gerust! Stuur je vraag per mail, dan helpen we je zo snel mogelijk verder.
          </p>
          <a
            className="ask-question__action ask-question__action--primary"
            href={`mailto:${askQuestion.email}?subject=${encodeURIComponent(askQuestion.subject)}`}
          >
            Mail je vraag
          </a>
          <p className="ask-question__note">
            Je vraag komt terecht bij de leidinggevende en de coördinatoren.
          </p>
        </section>
      ) : null}
      <button
        ref={toggleRef}
        type="button"
        className="ask-question__toggle"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen(!open)}
      >
        <ModuleIcon name="chat" />
        <span>{open ? 'Sluiten' : 'Vraag stellen'}</span>
      </button>
    </div>
  )
}

export default AskQuestion
