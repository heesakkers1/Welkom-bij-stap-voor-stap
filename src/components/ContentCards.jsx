import './ContentCards.css'

function ContentCards({ items = [], variant = 'default' }) {
  return (
    <ul className={`content-cards content-cards--${variant}`}>
      {items.map((item) => (
        <li key={item.title} className="content-card">
          {item.placeholder ? (
            <div className="content-card__media" aria-hidden="true" />
          ) : null}
          <p className="content-card__title">{item.title}</p>
          {item.text ? <p className="content-card__text">{item.text}</p> : null}
        </li>
      ))}
    </ul>
  )
}

export default ContentCards
