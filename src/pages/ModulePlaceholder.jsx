import Button from '../components/Button'
import './ModulePlaceholder.css'

function ModulePlaceholder({ module, onBack }) {
  return (
    <main className="module-placeholder">
      <div className="module-placeholder__card">
        <p className="module-placeholder__eyebrow">Onderdeel</p>
        <h1>{module?.title ?? 'Onbekend onderdeel'}</h1>
        <p>
          Dit onderdeel wordt later uitgewerkt. Voor nu kun je terug naar het
          dashboard.
        </p>
        <Button variant="secondary" onClick={onBack}>
          Terug naar dashboard
        </Button>
      </div>
    </main>
  )
}

export default ModulePlaceholder
