import { Link } from 'react-router-dom'
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
        <li key={index} className={`content-card${item.href && !item.href.startsWith('/') ? ' content-card--link' : ''}`}>
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
            {item.href && !item.href.startsWith('/') ? (
              <a className="content-card__link" href={item.href} target="_blank" rel="noopener noreferrer">
                <RichText text={item.title} /> <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <RichText text={item.title} />
            )}
          </p>
          {item.text && variant === 'where' ? (
            // Waar vind je wat: per regel een plek (vet) met het pad ernaast, netjes onder elkaar.
            <dl className="content-card__where">
              {item.text.split('\n').filter((line) => line.trim()).map((line, i) => {
                const [place, ...path] = line.split(' → ')
                return (
                  <div key={i} className="content-card__where-row">
                    <dt>{place.trim()}</dt>
                    <dd>{path.join(' → ')}</dd>
                  </div>
                )
              })}
            </dl>
          ) : item.text ? <p className="content-card__text"><RichText text={item.text} /></p> : null}
          {item.href?.startsWith('/') ? (
            // Link naar een andere les op deze site: zelfde tabblad.
            <Link className="content-card__extra" to={item.href}>
              {item.linkLabel || 'Lees opnieuw'} →
            </Link>
          ) : null}
          {item.extraLink?.href ? (
            <a className="content-card__extra" href={item.extraLink.href} target="_blank" rel="noopener noreferrer">
              {item.extraLink.label || 'Meer info'} ↗
            </a>
          ) : null}
          {item.extraLink2?.href ? (
            <a className="content-card__extra" href={item.extraLink2.href} target="_blank" rel="noopener noreferrer">
              {item.extraLink2.label || 'Meer info'} ↗
            </a>
          ) : null}
          {!withPhoto && item.src ? <ZoomImage src={item.src} alt={item.alt || item.title} /> : null}
        </li>
      ))}
    </ul>
  )
}

export default ContentCards
