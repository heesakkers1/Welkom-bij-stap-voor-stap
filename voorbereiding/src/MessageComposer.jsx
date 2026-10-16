import { useId, useRef, useState } from 'react'
import './MessageComposer.css'

/**
 * Een knop die een kant-en-klaar berichtje laat zien, met de keuze om het
 * te delen (WhatsApp, Teams, sms: wat de telefoon of computer aanbiedt),
 * te mailen of te kopiëren. Je kiest zelf naar wie je het stuurt.
 */
function MessageComposer({ label, subject, text }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const panelId = useId()
  const textRef = useRef(null)
  const canShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function'
  const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`

  async function share() {
    try {
      await navigator.share({ title: subject, text })
    } catch {
      // Delen afgebroken of niet gelukt; kopiëren en mailen blijven mogelijk.
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      textRef.current?.select()
      document.execCommand?.('copy')
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="message-composer">
      <button
        type="button"
        className="message-composer__toggle"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen(!open)}
      >
        <span aria-hidden="true">📨</span> {label}
      </button>
      {open ? (
        <div id={panelId} className="message-composer__panel">
          <label className="message-composer__label" htmlFor={`${panelId}-text`}>
            Je berichtje
          </label>
          <textarea
            id={`${panelId}-text`}
            ref={textRef}
            className="message-composer__text"
            value={text}
            readOnly
            rows={6}
          />
          <div className="message-composer__actions">
            {canShare ? (
              <button type="button" className="message-composer__action" onClick={share}>
                Delen
              </button>
            ) : null}
            <a className="message-composer__action" href={mailto}>
              Mailen
            </a>
            <button type="button" className="message-composer__action" onClick={copy}>
              {copied ? 'Gekopieerd!' : 'Kopiëren'}
            </button>
          </div>
          <p className="message-composer__note">
            Je kiest zelf naar wie je het stuurt. In het bericht zit de link naar
            deze checklist, met alle vinkjes van nu.
          </p>
        </div>
      ) : null}
    </div>
  )
}

export default MessageComposer
