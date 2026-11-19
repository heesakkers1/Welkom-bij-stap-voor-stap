import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { MODULE_STATUS, getCategoriesWithModules, siteTexts } from '../data/modules'
import { useProgress } from '../context/ProgressContext'
import ProgressBar from '../components/ProgressBar'
import ModuleIcon from '../components/ModuleIcon'
import QuickLinks from '../components/QuickLinks'
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
    completeModule,
    uncompleteModule,
  } = useProgress()

  const texts = siteTexts.dashboard
  const completionMessage = location.state?.completionMessage ?? null
  const resumeInfo = getResumeInfo()

  const categoriesWithModules = getCategoriesWithModules()
  const focusModuleId = location.state?.focusModule ?? null

  // Eén doorlopend stappenplan: alle modules op volgorde, per onderdeel gegroepeerd.
  const groups = []
  let stepNumber = 0
  for (const category of categoriesWithModules) {
    const steps = []
    for (const module of category.modules) {
      const status = getModuleStatus(module)
      if (status === MODULE_STATUS.COMING_SOON) continue
      stepNumber += 1
      steps.push({
        module,
        number: stepNumber,
        status,
        completedCount: getCompletedLessonCount(module),
      })
    }
    groups.push({ ...category, steps })
  }
  const allSteps = groups.flatMap((group) => group.steps)
  const totalSteps = allSteps.length
  const doneSteps = allSteps.filter((step) => step.status === MODULE_STATUS.COMPLETED).length
  // "Hier ben je" is altijd de eerste stap die nog niet is afgevinkt. Vooruit spieken
  // verplaatst die dus niet.
  const currentStep = allSteps.find((step) => step.status !== MODULE_STATUS.COMPLETED) ?? null
  const allDone = totalSteps > 0 && !currentStep

  // Terug uit een module: laat meteen de stap zien van de module waar je was.
  useEffect(() => {
    if (!focusModuleId) return
    const row = document.querySelector(`[data-module-id="${focusModuleId}"]`)
    row?.scrollIntoView({ block: 'center' })
  }, [focusModuleId])

  function stepPath(step) {
    if (step === currentStep && resumeInfo?.path?.split('/')[2] === step.module.id) {
      return resumeInfo.path
    }
    return `/module/${step.module.id}`
  }

  function dismissCelebration() {
    navigate('.', { replace: true, state: {} })
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
    <main className="dashboard page-backdrop">
      <header className="dashboard__header">
        <div className="dashboard__hero">
          <div className="dashboard__intro">
            <p className="dashboard__eyebrow">{texts.eyebrow}</p>
            <h1>{texts.title}</h1>
            <p>{texts.intro}</p>
          </div>
          <figure className="dashboard__hero-photo">
            <img
              src="/fotos/varkens.jpg"
              alt={texts.photoAlt}
            />
          </figure>
        </div>
        <ProgressBar
          value={overallProgressPercent}
          label="Jouw voortgang"
        />
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

      {currentStep ? (
        <section className="dashboard__next" aria-label="Hier ben je">
          <p className="dashboard__next-label">
            {hasStarted ? '📍 Hier ben je' : '👣 Je eerste stap'} · stap {currentStep.number} van{' '}
            {totalSteps}
          </p>
          <div className="dashboard__next-main">
            <span className="dashboard__next-icon">
              <ModuleIcon name={currentStep.module.icon} />
            </span>
            <div className="dashboard__next-text">
              <h2>{currentStep.module.title}</h2>
              <p>{currentStep.module.description}</p>
            </div>
          </div>
          <Link to={stepPath(currentStep)} className="dashboard__next-button">
            {currentStep.status === MODULE_STATUS.IN_PROGRESS ? 'Ga verder' : 'Begin'} met deze
            stap →
          </Link>
        </section>
      ) : null}

      {allDone ? (
        <section className="dashboard__next dashboard__next--done" role="status">
          <p className="dashboard__next-label">🎉 Alle stappen afgerond</p>
          <h2>Je hebt het hele stappenplan doorlopen.</h2>
          <p>Je kunt elke stap hieronder altijd nog eens teruglezen.</p>
        </section>
      ) : null}

      <section className="stepplan" aria-label="Jouw stappenplan">
        <div className="stepplan__head">
          <h2>Jouw stappenplan</h2>
          <span className="stepplan__count">
            {doneSteps} van {totalSteps} stappen klaar
          </span>
        </div>
        <p className="stepplan__hint">
          Tik op een rondje om een stap zelf af te vinken of het vinkje weer weg te halen.
        </p>

        {groups
          .filter((group) => group.steps.length > 0)
          .map((group) => (
            <div key={group.id} className="stepplan__group">
              <h3 className="stepplan__group-title">{group.title}</h3>
              <ol className="stepplan__list">
                {group.steps.map((step) => {
                  const isDone = step.status === MODULE_STATUS.COMPLETED
                  const isCurrent = step === currentStep
                  const lessons = step.module.lessons.length
                  const className = [
                    'stepplan__step',
                    isDone ? 'stepplan__step--done' : '',
                    isCurrent ? 'stepplan__step--current' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')

                  let meta = step.module.duration ?? ''
                  if (isDone) meta = 'Klaar'
                  else if (step.status === MODULE_STATUS.IN_PROGRESS && lessons > 1)
                    meta = `Bezig · ${step.completedCount} van ${lessons} delen`

                  return (
                    <li key={step.module.id} className={className}>
                      <button
                        type="button"
                        className="stepplan__marker"
                        aria-pressed={isDone}
                        aria-label={
                          isDone
                            ? `Vinkje weghalen bij ${step.module.title}`
                            : `${step.module.title} afvinken`
                        }
                        title={isDone ? 'Vinkje weghalen' : 'Afvinken'}
                        onClick={() =>
                          isDone ? uncompleteModule(step.module.id) : completeModule(step.module.id)
                        }
                      >
                        {isDone ? '✓' : step.number}
                      </button>
                      <Link
                        to={stepPath(step)}
                        className="stepplan__link"
                        data-module-id={step.module.id}
                        aria-current={isCurrent ? 'step' : undefined}
                      >
                        <span className="stepplan__icon" aria-hidden="true">
                          <ModuleIcon name={step.module.icon} />
                        </span>
                        <span className="stepplan__body">
                          <span className="stepplan__title">{step.module.title}</span>
                          <span className="stepplan__meta">
                            {isCurrent ? (
                              <span className="stepplan__here">Hier ben je</span>
                            ) : null}
                            {meta}
                          </span>
                        </span>
                        <span className="stepplan__chevron" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ol>
            </div>
          ))}
      </section>

      <footer className="dashboard__footer">
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

      <QuickLinks />
    </main>
  )
}

export default Dashboard
