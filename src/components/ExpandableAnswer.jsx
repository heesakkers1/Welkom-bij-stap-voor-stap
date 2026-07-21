import { useState } from 'react'
import './ExpandableAnswer.css'

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
          <p>{answer}</p>
        </div>
      ) : null}
    </section>
  )
}

export default ExpandableAnswer
