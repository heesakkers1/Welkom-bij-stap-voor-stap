import { useNavigate } from 'react-router-dom'
import { modules, siteTexts } from '../data/modules'
import { useProgress } from '../context/ProgressContext'
import ImagePlaceholder from '../components/ImagePlaceholder'
import Button from '../components/Button'
import './WelcomeScreen.css'

function WelcomeScreen() {
  const navigate = useNavigate()
  const { markWelcomeSeen } = useProgress()
  const moduleCount = modules.length
  const texts = siteTexts.welcome

  function startJourney() {
    markWelcomeSeen()
    navigate('/')
  }

  return (
    <main className="welcome-screen page-backdrop">
      <div className="welcome-screen__inner">
        <header className="welcome-screen__header">
          <p className="welcome-screen__brand">{texts.brand}</p>
          <h1>{texts.title}</h1>
          <p className="welcome-screen__subtitle">{texts.subtitle}</p>
        </header>

        <section className="welcome-screen__intro">
          {texts.intro.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </section>

        <ImagePlaceholder
          caption={texts.imageCaption}
          size="wide"
        />

        <section className="welcome-screen__facts" aria-label="Over deze onboarding">
          <article className="welcome-fact">
            <p className="welcome-fact__label">{texts.durationLabel}</p>
            <p className="welcome-fact__value">{texts.durationValue}</p>
          </article>

          <article className="welcome-fact">
            <p className="welcome-fact__label">{texts.modulesLabel}</p>
            <p className="welcome-fact__value">{moduleCount} onderdelen</p>
          </article>

          <article className="welcome-fact welcome-fact--goal">
            <p className="welcome-fact__label">{texts.goalLabel}</p>
            <p className="welcome-fact__value">{texts.goalValue}</p>
          </article>
        </section>

        <div className="welcome-screen__cta">
          <Button onClick={startJourney}>{texts.button}</Button>
        </div>
      </div>
    </main>
  )
}

export default WelcomeScreen
