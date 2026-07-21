import { Link } from 'react-router-dom'
import './Header.css'

function Header({ title, backTo = '/', backLabel = 'Terug naar dashboard' }) {
  return (
    <header className="app-header">
      <div className="app-header__row">
        <Link to={backTo} className="app-header__back">
          {backLabel}
        </Link>
        <p className="app-header__brand">Stap voor Stap</p>
      </div>
      {title ? <h1 className="app-header__title">{title}</h1> : null}
    </header>
  )
}

export default Header
