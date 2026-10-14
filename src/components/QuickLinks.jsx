import ModuleIcon from './ModuleIcon'
import { quickLinks } from '../data/quickLinks'
import './QuickLinks.css'

function QuickLinks() {
  return (
    <section className="quick-links" aria-labelledby="quick-links-title">
      <h2 id="quick-links-title" className="quick-links__title">
        Snel naar
      </h2>
      <ul className="quick-links__list">
        {quickLinks.map((link) => {
          const content = (
            <>
              <span className="quick-links__icon">
                <ModuleIcon name={link.icon} />
              </span>
              <span className="quick-links__text">
                <span className="quick-links__name">
                  {link.title}
                  {link.href ? (
                    <span className="visually-hidden"> (opent in een nieuw tabblad)</span>
                  ) : null}
                </span>
                <span className="quick-links__description">
                  {link.href ? link.text : 'Link volgt'}
                </span>
              </span>
            </>
          )

          return (
            <li key={link.id}>
              {link.href ? (
                <a
                  className="quick-links__item"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content}
                </a>
              ) : (
                <div className="quick-links__item quick-links__item--pending">
                  {content}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default QuickLinks
