import { useId, useRef, useState } from 'react'
import RichText from './RichText'
import './EmailSignature.css'

/** Het logo staat op de live site, zodat het ook in verstuurde mails te zien blijft. */
const LOGO_URL = 'https://welkom-bij-stap-voor-stap.vercel.app/handtekening/logo-stap-voor-stap.png'

const FONT = "Aptos, Calibri, Arial, sans-serif"

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function withoutProtocol(url) {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

/** De handtekening als opgemaakte tekst (HTML), zoals Outlook hem plakt. */
function signatureHtml({ groet, naam, functie, dagen, email, website, telefoon }) {
  const line = `margin:0;font-family:${FONT};font-size:11pt;line-height:1.35;color:#222222;`
  const link = 'color:#0b6b5a;text-decoration:underline;'
  const site = withoutProtocol(website)
  return [
    `<div style="${line}">`,
    `<p style="${line}">${escapeHtml(groet)}</p>`,
    `<p style="${line}">${escapeHtml(naam)}</p>`,
    `<p style="${line}">&nbsp;</p>`,
    `<p style="${line}"><i>${escapeHtml(functie)}</i></p>`,
    `<p style="${line}">Zorgboerderij Stap voor Stap</p>`,
    `<p style="${line}">Aanwezig op boerderij: ${escapeHtml(dagen)}</p>`,
    `<p style="${line}">E: <a href="mailto:${escapeHtml(email)}" style="${link}">${escapeHtml(email)}</a></p>`,
    `<p style="${line}">W: <a href="https://${escapeHtml(site)}" style="${link}">${escapeHtml(site)}</a></p>`,
    `<p style="${line}">Algemeen nummer: ${escapeHtml(telefoon)}</p>`,
    `<p style="${line}">&nbsp;</p>`,
    `<p style="${line}"><img src="${LOGO_URL}" width="120" height="120" alt="Zorgboerderij Stap voor Stap" style="display:block;width:120px;height:120px;border:0;"></p>`,
    '</div>',
  ].join('')
}

function signatureText({ groet, naam, functie, dagen, email, website, telefoon }) {
  return [
    groet,
    naam,
    '',
    functie,
    'Zorgboerderij Stap voor Stap',
    `Aanwezig op boerderij: ${dagen}`,
    `E: ${email}`,
    `W: ${withoutProtocol(website)}`,
    `Algemeen nummer: ${telefoon}`,
  ].join('\n')
}

/** Reserve voor browsers zonder ClipboardItem: kopieer het voorbeeld zoals het op het scherm staat. */
function copyBySelecting(element) {
  const selection = window.getSelection()
  const range = document.createRange()
  range.selectNodeContents(element)
  selection.removeAllRanges()
  selection.addRange(range)
  const ok = document.execCommand('copy')
  selection.removeAllRanges()
  return ok
}

function EmailSignature({
  title,
  text,
  steps = [],
  photoTip,
  photoHref,
  photoLinkLabel = 'Open de map op SharePoint',
  phoneTip,
  email = 'info@zorgboerderijstapvoorstap.nl',
  website = 'www.zorgboerderijstapvoorstap.nl',
  telefoon = '06-28 53 06 13',
}) {
  const id = useId()
  const previewRef = useRef(null)
  const [naam, setNaam] = useState('')
  const [functie, setFunctie] = useState('')
  const [dagen, setDagen] = useState('')
  const [status, setStatus] = useState(null)

  const values = {
    groet: 'Hartelijke groet,',
    naam: naam.trim() || '[Jouw naam]',
    functie: functie.trim() || '[Jouw functie]',
    dagen: dagen.trim() || '[jouw dagen]',
    email,
    website,
    telefoon,
  }

  async function copy() {
    const html = signatureHtml(values)
    const plain = signatureText(values)
    try {
      if (window.ClipboardItem && navigator.clipboard?.write) {
        await navigator.clipboard.write([
          new window.ClipboardItem({
            'text/html': new Blob([html], { type: 'text/html' }),
            'text/plain': new Blob([plain], { type: 'text/plain' }),
          }),
        ])
      } else if (!copyBySelecting(previewRef.current)) {
        throw new Error('Kopiëren lukte niet')
      }
      setStatus('ok')
    } catch {
      setStatus(copyBySelecting(previewRef.current) ? 'ok' : 'fout')
    }
  }

  const site = withoutProtocol(website)

  return (
    <section className="lesson-block email-signature">
      {title ? <h3 className="email-signature__title"><RichText text={title} /></h3> : null}
      {text ? <p className="email-signature__text"><RichText text={text} /></p> : null}

      <div className="email-signature__fields">
        <label htmlFor={`${id}-naam`}>Jouw naam</label>
        <input
          id={`${id}-naam`}
          type="text"
          value={naam}
          onChange={(event) => { setNaam(event.target.value); setStatus(null) }}
          placeholder="Voornaam Achternaam"
          autoComplete="name"
        />
        <label htmlFor={`${id}-functie`}>Jouw functie</label>
        <input
          id={`${id}-functie`}
          type="text"
          value={functie}
          onChange={(event) => { setFunctie(event.target.value); setStatus(null) }}
          placeholder="bijv. Begeleider dagbesteding"
        />
        <label htmlFor={`${id}-dagen`}>Op de boerderij op</label>
        <input
          id={`${id}-dagen`}
          type="text"
          value={dagen}
          onChange={(event) => { setDagen(event.target.value); setStatus(null) }}
          placeholder="bijv. di en vr"
        />
      </div>

      <p className="email-signature__label">Zo ziet je handtekening eruit</p>
      <div className="email-signature__preview" ref={previewRef}>
        <p>{values.groet}</p>
        <p>{values.naam}</p>
        <p>&nbsp;</p>
        <p><i>{values.functie}</i></p>
        <p>Zorgboerderij Stap voor Stap</p>
        <p>Aanwezig op boerderij: {values.dagen}</p>
        <p>E: <a href={`mailto:${email}`}>{email}</a></p>
        <p>W: <a href={`https://${site}`} target="_blank" rel="noopener noreferrer">{site}</a></p>
        <p>Algemeen nummer: {telefoon}</p>
        <p>&nbsp;</p>
        <p>
          <img
            src="/handtekening/logo-stap-voor-stap.png"
            width="120"
            height="120"
            alt="Zorgboerderij Stap voor Stap"
            className="email-signature__logo"
          />
        </p>
      </div>

      <button type="button" className="email-signature__copy" onClick={copy}>
        📋 Kopieer handtekening
      </button>
      <p className="email-signature__status" role="status">
        {status === 'ok' ? 'Gekopieerd! Plak hem nu in Outlook (Ctrl + V).' : null}
        {status === 'fout' ? 'Kopiëren lukte niet. Selecteer het voorbeeld hierboven en kopieer het zelf.' : null}
      </p>

      {steps.length > 0 ? (
        <>
          <p className="email-signature__label">Zo zet je hem in Outlook</p>
          <ol className="email-signature__steps">
            {steps.map((step, index) => (
              <li key={index}><RichText text={step} /></li>
            ))}
          </ol>
        </>
      ) : null}

      {photoTip ? (
        <div className="email-signature__tip">
          <p><RichText text={photoTip} /></p>
          {photoHref ? (
            <a
              className="email-signature__photo-button"
              href={photoHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              📷 {photoLinkLabel}
            </a>
          ) : null}
        </div>
      ) : null}

      {phoneTip ? <p className="email-signature__note"><RichText text={phoneTip} /></p> : null}
    </section>
  )
}

export default EmailSignature
