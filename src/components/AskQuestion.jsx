import { useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
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
            Stel hem gerust! Je buddy, je werkbegeleider en je collega’s helpen je graag.
          </p>
          <a
            className="ask-question__action ask-question__action--primary"
            href={askQuestion.chatHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            Stuur een bericht via Zorg-Chat
            <span className="visually-hidden"> (opent in een nieuw tabblad)</span>
          </a>
          <Link className="ask-question__action" to={askQuestion.contactsPath}>
            Wie benader je waarvoor?
          </Link>
          <a className="ask-question__action" href={`mailto:${askQuestion.email}`}>
            Mail naar {askQuestion.email}
          </a>
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
