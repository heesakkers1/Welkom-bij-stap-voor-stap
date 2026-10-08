import { Link, useNavigate } from 'react-router-dom'
import './Header.css'

function Header({ title, backTo = '/' }) {
  const navigate = useNavigate()

  function goBack() {
    // Zonder eerdere pagina in deze sessie (bijv. via een gedeelde link)
    // gaan we naar de bovenliggende pagina.
    if (window.history.state?.idx > 0) {
      navigate(-1)
    } else {
      navigate(backTo, { replace: true })
    }
  }

  return (
    <header className="app-header">
      <div className="app-header__row">
        <button type="button" className="app-header__back" onClick={goBack}>
          <span aria-hidden="true">←</span> Terug
        </button>
        <Link
          to="/"
          className="app-header__home"
          aria-label="Naar de startpagina"
          title="Naar de startpagina"
        >
          <img src="/home-icon.png" alt="" />
        </Link>
      </div>
      {title ? <h1 className="app-header__title">{title}</h1> : null}
    </header>
  )
}

export default Header
