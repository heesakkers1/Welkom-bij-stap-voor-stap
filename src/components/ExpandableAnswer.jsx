import { useState } from 'react'
import RichText from './RichText'
import './ExpandableAnswer.css'

// Het antwoord mag eenvoudige opmaak hebben: een lege regel begint een nieuw stukje,
// regels die met "- " beginnen worden een opsomming, **vet** werkt als kopje.
function AnswerText({ text = '' }) {
  return text
    .split(/\n\s*\n/)
    .filter((part) => part.trim())
    .map((part, index) => {
      const lines = part.split('\n').map((line) => line.trim()).filter(Boolean)
      const intro = lines.filter((line) => !line.startsWith('- '))
      const bullets = lines.filter((line) => line.startsWith('- '))
      return (
        <div className="expandable-answer__part" key={index}>
          {intro.map((line, lineIndex) => (
            <p key={lineIndex}><RichText text={line} /></p>
          ))}
          {bullets.length ? (
            <ul>
              {bullets.map((line, lineIndex) => (
                <li key={lineIndex}><RichText text={line.slice(2)} /></li>
              ))}
            </ul>
          ) : null}
        </div>
      )
    })
}

function ExpandableAnswer({
  situation,
  question,
  answer,
  answerLabel = 'Bekijk een mogelijke richting',
}) {
  const [open, setOpen] = useState(false)

  return (
    <section className="expandable-answer">
      {situation ? (
        <div className="expandable-answer__situation">
          <p className="expandable-answer__label">Situatie</p>
          <p>{situation}</p>
        </div>
      ) : null}

      {question ? (
        <div className="expandable-answer__question">
          <p className="expandable-answer__label">Reflectievraag</p>
          <p>{question}</p>
        </div>
      ) : null}

      <button
        type="button"
        className="expandable-answer__toggle"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? 'Verberg voorbeeldantwoord' : answerLabel}
      </button>

      {open ? (
        <div className="expandable-answer__panel">
          <AnswerText text={answer} />
        </div>
      ) : null}
    </section>
  )
}

export default ExpandableAnswer
