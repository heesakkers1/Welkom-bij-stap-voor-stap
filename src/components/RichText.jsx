import { Fragment } from 'react'
import './RichText.css'

/** Vet (**woord**), cursief (*woord*) en tabs binnen één regel. */
const INLINE = /(\*\*[^*\n]+?\*\*|\*[^*\n]+?\*|\t)/g

function renderLine(line, lineIndex) {
  return line.split(INLINE).map((part, index) => {
    const key = `${lineIndex}-${index}`
    if (part === '\t') return <span key={key} className="rich-text__tab" aria-hidden="true" />
    if (part.length > 4 && part.startsWith('**') && part.endsWith('**')) {
      return <strong key={key}>{part.slice(2, -2)}</strong>
    }
    if (part.length > 2 && part.startsWith('*') && part.endsWith('*')) {
      return <em key={key}>{part.slice(1, -1)}</em>
    }
    return part
  })
}

/**
 * Toont een tekst uit content.json:
 * - **woorden** tussen twee sterretjes worden vet,
 * - *woorden* tussen één sterretje worden cursief,
 * - een enter wordt een nieuwe regel,
 * - een tab wordt een stukje inspringing.
 */
function RichText({ text }) {
  if (typeof text !== 'string' || !/[*\n\t]/.test(text)) return text ?? null
  return text.split('\n').map((line, lineIndex) => (
    <Fragment key={lineIndex}>
      {lineIndex > 0 ? <br /> : null}
      {renderLine(line, lineIndex)}
    </Fragment>
  ))
}

export default RichText
