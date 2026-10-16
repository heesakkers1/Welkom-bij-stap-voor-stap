import RichText from './RichText'
import './Timeline.css'

function Timeline({ items = [] }) {
  return (
    <ol className="timeline">
      {items.map((item, index) => {
        const label = typeof item === 'string' ? item : item.title
        const text = typeof item === 'string' ? null : item.text

        return (
          <li key={`${label}-${index}`} className="timeline__item">
            <span className="timeline__dot" aria-hidden="true" />
            <div className="timeline__body">
              <p className="timeline__title"><RichText text={label} /></p>
              {text ? <p className="timeline__text"><RichText text={text} /></p> : null}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export default Timeline
