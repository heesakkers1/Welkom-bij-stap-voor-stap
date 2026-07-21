import { useNavigate } from 'react-router-dom'
import { MODULE_STATUS, modules } from '../data/modules'
import { useProgress } from '../context/ProgressContext'
import ProgressBar from '../components/ProgressBar'
import ModuleTile from '../components/ModuleTile'
import Button from '../components/Button'
import './Dashboard.css'

function Dashboard() {
  const navigate = useNavigate()
  const {
    overallProgressPercent,
    getModuleStatus,
    getCompletedLessonCount,
    resetProgress,
  } = useProgress()

  function startOnboarding() {
    const firstModule = modules[0]
    if (firstModule) {
      navigate(`/module/${firstModule.id}`)
    }
  }

  function handleReset() {
    const confirmed = window.confirm(
      'Weet je zeker dat je alle voortgang wilt wissen? Dit kan niet ongedaan worden gemaakt.',
    )
    if (confirmed) {
      resetProgress()
    }
  }

  return (
    <main className="dashboard">
      <header className="dashboard__header">
        <div className="dashboard__intro">
          <p className="dashboard__eyebrow">Welkom!</p>
          <h1>Fijn dat je er bent.</h1>
          <p>Hieronder zie je jouw reis door Stap voor Stap.</p>
        </div>
        <ProgressBar
          value={overallProgressPercent}
          label="Jouw voortgang"
        />
      </header>

      <section className="dashboard__modules" aria-label="Onboarding onderdelen">
        {modules.map((module) => {
          const status = getModuleStatus(module)
          const completedCount = getCompletedLessonCount(module)
          const totalSteps = module.lessons.length

          let statusLabel = status
          if (status === MODULE_STATUS.IN_PROGRESS && totalSteps > 0) {
            statusLabel = `Bezig · ${completedCount} van ${totalSteps} stappen voltooid`
          } else if (status === MODULE_STATUS.COMPLETED) {
            statusLabel = 'Afgerond'
          }

          return (
            <ModuleTile
              key={module.id}
              module={module}
              status={status}
              statusLabel={statusLabel}
            />
          )
        })}
      </section>

      <footer className="dashboard__footer">
        <Button onClick={startOnboarding}>Begin met onboarding</Button>
        <button
          type="button"
          className="dashboard__secondary-link"
          onClick={() => navigate('/intro')}
        >
          👋 Welkom opnieuw bekijken
        </button>
        <button
          type="button"
          className="dashboard__reset"
          onClick={handleReset}
        >
          Voortgang resetten
        </button>
      </footer>
    </main>
  )
}

export default Dashboard
