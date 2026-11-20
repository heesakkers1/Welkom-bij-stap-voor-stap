import RichText from './RichText'
import { previewSrc } from './imagePreview'
import ZoomImage from './ZoomImage'
import './ContentCards.css'

function ContentCards({ items = [], variant = 'default' }) {
  // Bij de plekken op het erf heeft elk kaartje een vak voor een foto.
  const withPhoto = variant === 'places'
  return (
    <ul className={`content-cards content-cards--${variant}`}>
      {items.map((item, index) => (
        <li key={index} className={`content-card${item.href ? ' content-card--link' : ''}`}>
          {withPhoto && item.src ? (
            <img
              className="content-card__photo"
              src={previewSrc(item.src)}
              alt={item.alt || item.title}
              loading="lazy"
            />
          ) : withPhoto || item.placeholder ? (
            <div className="content-card__media" aria-hidden="true">
              {withPhoto ? <span>📷 Foto volgt</span> : null}
            </div>
          ) : null}
          <p className="content-card__title">
            {item.href ? (
              <a className="content-card__link" href={item.href} target="_blank" rel="noopener noreferrer">
                <RichText text={item.title} /> <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <RichText text={item.title} />
            )}
          </p>
          {item.text ? <p className="content-card__text"><RichText text={item.text} /></p> : null}
          {!withPhoto && item.src ? <ZoomImage src={item.src} alt={item.alt || item.title} /> : null}
        </li>
      ))}
    </ul>
  )
}

export default ContentCards
