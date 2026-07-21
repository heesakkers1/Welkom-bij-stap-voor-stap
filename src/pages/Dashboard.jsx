import { useLocation, useNavigate } from 'react-router-dom'
import { MODULE_STATUS, modules } from '../data/modules'
import { useProgress } from '../context/ProgressContext'
import ProgressBar from '../components/ProgressBar'
import ModuleTile from '../components/ModuleTile'
import Button from '../components/Button'
import './Dashboard.css'

function Dashboard() {
  const navigate = useNavigate()
  const location = useLocation()
  const {
    overallProgressPercent,
    getModuleStatus,
    getCompletedLessonCount,
    resetProgress,
    hasStarted,
    getResumeInfo,
  } = useProgress()

  const completionMessage = location.state?.completionMessage ?? null
  const resumeInfo = getResumeInfo()

  function dismissCelebration() {
    navigate('.', { replace: true, state: {} })
  }

  function handlePrimaryAction() {
    if (resumeInfo?.path) {
      navigate(resumeInfo.path)
      return
    }

    const first = modules.find((module) => module.lessons.length > 0)
    if (first) {
      navigate(`/module/${first.id}`)
    }
  }

  function handleReset() {
    const confirmed = window.confirm(
      'Weet je zeker dat je alle voortgang wilt wissen? Dit kan niet ongedaan worden gemaakt.',
    )
    if (confirmed) {
      resetProgress()
      dismissCelebration()
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
        {resumeInfo ? (
          <p className="dashboard__resume-hint">
            {hasStarted ? 'Ga verder bij: ' : 'Begin bij: '}
            <strong>{resumeInfo.label}</strong>
          </p>
        ) : null}
      </header>

      {completionMessage ? (
        <section className="dashboard__celebration" role="status" aria-live="polite">
          <h2>{completionMessage.title}</h2>
          <p>{completionMessage.text}</p>
          <button
            type="button"
            className="dashboard__celebration-close"
            onClick={dismissCelebration}
          >
            Sluiten
          </button>
        </section>
      ) : null}

      <section className="dashboard__modules" aria-label="Onboarding onderdelen">
        {modules.map((module) => {
          const status = getModuleStatus(module)
          const completedCount = getCompletedLessonCount(module)
          const totalSteps = module.lessons.length
          const comingSoon = status === MODULE_STATUS.COMING_SOON

          let statusLabel = status
          if (status === MODULE_STATUS.IN_PROGRESS && totalSteps > 0) {
            statusLabel = `Bezig · ${completedCount} van ${totalSteps} stappen`
          } else if (status === MODULE_STATUS.COMPLETED) {
            statusLabel = 'Afgerond'
          } else if (status === MODULE_STATUS.NOT_STARTED && totalSteps > 0) {
            statusLabel = `Nog niet gestart · ${totalSteps} stappen`
          }

          return (
            <ModuleTile
              key={module.id}
              module={module}
              status={status}
              statusLabel={statusLabel}
              disabled={comingSoon}
              completedCount={completedCount}
              totalSteps={totalSteps}
            />
          )
        })}
      </section>

      <footer className="dashboard__footer">
        <Button onClick={handlePrimaryAction}>
          {hasStarted ? 'Ga verder waar je gebleven was' : 'Zet de eerste stap'}
        </Button>
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
