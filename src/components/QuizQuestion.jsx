import { useState } from 'react'
import './QuizQuestion.css'
import RichText from './RichText'

function QuizQuestion({ question, options = [], correct, explanation }) {
  const [chosen, setChosen] = useState(null)
  const answered = chosen !== null
  const isCorrect = chosen === correct

  return (
    <section className="quiz-question">
      <p className="quiz-question__label">Vraag</p>
      <p className="quiz-question__text"><RichText text={question} /></p>

      <ul className="quiz-question__options">
        {options.map((option, index) => {
          let state = ''
          if (answered && index === correct) state = ' quiz-question__option--correct'
          else if (answered && index === chosen) state = ' quiz-question__option--wrong'

          return (
            <li key={index}>
              <button
                type="button"
                className={`quiz-question__option${state}`}
                aria-pressed={chosen === index}
                disabled={answered}
                onClick={() => setChosen(index)}
              >
                <RichText text={option} />
              </button>
            </li>
          )
        })}
      </ul>

      {answered ? (
        <div className="quiz-question__feedback" role="status" aria-live="polite">
          <p className="quiz-question__verdict">
            {isCorrect ? '✓ Goed!' : 'Net niet. Het juiste antwoord is groen gemarkeerd.'}
          </p>
          {explanation ? <p><RichText text={explanation} /></p> : null}
          <button
            type="button"
            className="quiz-question__retry"
            onClick={() => setChosen(null)}
          >
            Opnieuw proberen
          </button>
        </div>
      ) : null}
    </section>
  )
}

export default QuizQuestion
