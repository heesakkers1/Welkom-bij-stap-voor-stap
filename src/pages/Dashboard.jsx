import { modules } from '../data/modules'
import ProgressBar from '../components/ProgressBar'
import ModuleTile from '../components/ModuleTile'
import Button from '../components/Button'
import './Dashboard.css'

function Dashboard({ onStart, onSelectModule }) {
  const progress = 0

  return (
    <main className="dashboard">
      <header className="dashboard__header">
        <div className="dashboard__intro">
          <h1>Welkom bij de zorgboerderij</h1>
          <p>Jouw onboarding stap voor stap</p>
        </div>
        <ProgressBar value={progress} label="Jouw voortgang" />
      </header>

      <section className="dashboard__modules" aria-label="Onboarding onderdelen">
        {modules.map((module) => (
          <ModuleTile
            key={module.id}
            module={module}
            onSelect={onSelectModule}
          />
        ))}
      </section>

      <footer className="dashboard__footer">
        <Button onClick={onStart}>Begin met onboarding</Button>
      </footer>
    </main>
  )
}

export default Dashboard
