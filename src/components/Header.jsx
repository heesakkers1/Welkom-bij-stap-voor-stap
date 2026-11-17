import { Link } from 'react-router-dom'
import './Header.css'

/**
 * Bovenbalk van een module: "← Overzicht" brengt je altijd terug naar de
 * startpagina (niet door alle vorige stappen heen), met daaronder in welk
 * onderdeel en welke module je bent.
 */
function Header({ title, eyebrow, backTo = '/', backLabel = 'Overzicht', backState }) {
  return (
    <header className="app-header">
      <div className="app-header__row">
        <Link to={backTo} state={backState} className="app-header__back">
          <span aria-hidden="true">←</span> {backLabel}
        </Link>
        <Link
          to="/"
          state={backState}
          className="app-header__home"
          aria-label="Naar de startpagina"
          title="Naar de startpagina"
        >
          <img src="/home-icon.png" alt="" />
        </Link>
      </div>
      {eyebrow ? <p className="app-header__eyebrow">{eyebrow}</p> : null}
      {title ? <h1 className="app-header__title">{title}</h1> : null}
    </header>
  )
}

export default Header
