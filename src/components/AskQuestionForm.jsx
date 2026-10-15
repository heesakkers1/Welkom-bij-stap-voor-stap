import { useId, useState } from 'react'
import { askQuestion } from '../data/askQuestion'

function buildMailto(name, message) {
  const body = name ? `${message}\n\nGroet,\n${name}` : message
  return `mailto:${askQuestion.email}?subject=${encodeURIComponent(
    askQuestion.subject,
  )}&body=${encodeURIComponent(body)}`
}

function AskQuestionForm() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle')
  const nameId = useId()
  const messageId = useId()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const trimmed = message.trim()
    if (!trimmed) return

    if (!askQuestion.formKey) {
      window.location.href = buildMailto(name.trim(), trimmed)
      return
    }

    // Honeypot: echte bezoekers zien dit veld niet en laten het leeg.
    if (event.currentTarget.elements.botcheck?.checked) return

    setStatus('sending')
    try {
      const response = await fetch(askQuestion.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: askQuestion.formKey,
          subject: askQuestion.subject,
          from_name: 'Onboarding Stap voor Stap',
          name: name.trim() || 'Onbekend',
          message: trimmed,
        }),
      })
      const result = await response.json().catch(() => ({}))
      setStatus(response.ok && result.success !== false ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <p className="ask-question__done" role="status">
        Top, je vraag is onderweg! 📨 Een van ons pakt hem zo snel mogelijk op en komt bij je
        terug.
      </p>
    )
  }

  return (
    <form className="ask-question__form" onSubmit={handleSubmit}>
      <label className="ask-question__label" htmlFor={nameId}>
        Je naam
      </label>
      <input
        id={nameId}
        className="ask-question__input"
        type="text"
        autoComplete="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <label className="ask-question__label" htmlFor={messageId}>
        Je vraag
      </label>
      <textarea
        id={messageId}
        className="ask-question__input ask-question__textarea"
        rows={4}
        required
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <input
        type="checkbox"
        name="botcheck"
        className="ask-question__honeypot"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <button
        type="submit"
        className="ask-question__action ask-question__action--primary"
        disabled={status === 'sending'}
      >
        {status === 'sending' ? 'Versturen…' : 'Verstuur je vraag'}
      </button>
      {status === 'error' ? (
        <p className="ask-question__error" role="alert">
          Versturen lukte niet. Probeer het later nog eens, of{' '}
          <a href={buildMailto(name.trim(), message.trim())}>stuur je vraag per mail</a>.
        </p>
      ) : null}
    </form>
  )
}

export default AskQuestionForm
