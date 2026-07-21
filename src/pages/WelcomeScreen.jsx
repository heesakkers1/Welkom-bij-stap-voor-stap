import { useNavigate } from 'react-router-dom'
import { modules } from '../data/modules'
import { useProgress } from '../context/ProgressContext'
import ImagePlaceholder from '../components/ImagePlaceholder'
import Button from '../components/Button'
import './WelcomeScreen.css'

function WelcomeScreen() {
  const navigate = useNavigate()
  const { markWelcomeSeen } = useProgress()
  const moduleCount = modules.length

  function startJourney() {
    markWelcomeSeen()
    navigate('/')
  }

  return (
    <main className="welcome-screen">
      <div className="welcome-screen__inner">
        <header className="welcome-screen__header">
          <p className="welcome-screen__brand">Team Stap voor Stap</p>
          <h1>🌿 Welkom bij Stap voor Stap</h1>
          <p className="welcome-screen__subtitle">Leuk dat je er bent!</p>
        </header>

        <section className="welcome-screen__intro">
          <p>We gaan je stap voor stap wegwijs maken op onze zorgboerderij.</p>
          <p>Je hoeft niet alles vandaag te leren.</p>
          <p>Neem rustig de tijd.</p>
          <p>
            Deze leeromgeving blijft altijd beschikbaar zodat je later
            onderdelen opnieuw kunt bekijken.
          </p>
        </section>

        <ImagePlaceholder
          caption="Hier komt later een foto of video van onze zorgboerderij."
          size="wide"
        />

        <section className="welcome-screen__facts" aria-label="Over deze onboarding">
          <article className="welcome-fact">
            <p className="welcome-fact__label">⏱ Totale duur</p>
            <p className="welcome-fact__value">ongeveer 60–90 minuten</p>
          </article>

          <article className="welcome-fact">
            <p className="welcome-fact__label">📚 Modules</p>
            <p className="welcome-fact__value">{moduleCount} onderdelen</p>
          </article>

          <article className="welcome-fact welcome-fact--goal">
            <p className="welcome-fact__label">🎯 Doel</p>
            <p className="welcome-fact__value">
              Na afloop weet je hoe wij werken en kun je met vertrouwen aan de
              slag.
            </p>
          </article>
        </section>

        <div className="welcome-screen__cta">
          <Button onClick={startJourney}>🌱 Zet de eerste stap</Button>
        </div>
      </div>
    </main>
  )
}

export default WelcomeScreen
