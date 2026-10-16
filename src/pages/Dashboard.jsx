import { useLocation, useNavigate } from 'react-router-dom'
import { MODULE_STATUS, getCategoriesWithModules, modules, siteTexts } from '../data/modules'
import { useProgress } from '../context/ProgressContext'
import ProgressBar from '../components/ProgressBar'
import ModuleTile from '../components/ModuleTile'
import Button from '../components/Button'
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
  } = useProgress()

  const texts = siteTexts.dashboard
  const completionMessage = location.state?.completionMessage ?? null
  const resumeInfo = getResumeInfo()

  const categoriesWithModules = getCategoriesWithModules()
  const resumeModuleId = resumeInfo?.path?.split('/')[2] ?? null
  const openCategoryId =
    categoriesWithModules.find((category) =>
      category.moduleIds.includes(resumeModuleId),
    )?.id ?? categoriesWithModules[0]?.id

  function renderTile(module) {
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
  }

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

      <div className="dashboard__categories" aria-label="Onboarding onderdelen">
        {categoriesWithModules.map((category) => {
          const available = category.modules.filter(
            (module) => getModuleStatus(module) !== MODULE_STATUS.COMING_SOON,
          )
          const completed = available.filter(
            (module) => getModuleStatus(module) === MODULE_STATUS.COMPLETED,
          ).length

          return (
            <details
              key={category.id}
              className="dashboard__category"
              open={category.id === openCategoryId}
            >
              <summary className="dashboard__category-header">
                <span className="dashboard__category-text">
                  <span className="dashboard__category-title">{category.title}</span>
                  {category.description ? (
                    <span className="dashboard__category-description">
                      {category.description}
                    </span>
                  ) : null}
                  <span className="dashboard__category-count">
                    {completed} van {available.length} afgerond
                  </span>
                </span>
              </summary>

              <section className="dashboard__modules">
                {category.modules.map((module) => renderTile(module))}
                {category.image ? (
                  <figure
                    className={`dashboard__category-image${
                      category.modules.length % 3 === 2 ? ' dashboard__category-image--narrow' : ''
                    }`}
                  >
                    <img src={category.image.src} alt={category.image.alt} loading="lazy" />
                  </figure>
                ) : null}
              </section>
            </details>
          )
        })}
      </div>

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

      <QuickLinks />
    </main>
  )
}

export default Dashboard
