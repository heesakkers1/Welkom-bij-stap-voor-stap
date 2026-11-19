import RichText from './RichText'
import ZoomImage from './ZoomImage'
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
              {typeof item === 'object' && item.src ? (
                <ZoomImage src={item.src} alt={item.alt || label} />
              ) : null}
              {typeof item === 'object' && Array.isArray(item.extra)
                ? item.extra.map((extra, extraIndex) => (
                    <div key={extraIndex} className="timeline__extra">
                      {extra.text ? <p className="timeline__text"><RichText text={extra.text} /></p> : null}
                      {extra.src ? <ZoomImage src={extra.src} alt={extra.alt || ''} /> : null}
                    </div>
                  ))
                : null}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export default Timeline
