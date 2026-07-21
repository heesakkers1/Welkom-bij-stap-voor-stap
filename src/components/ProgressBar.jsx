import './ProgressBar.css'

function ProgressBar({ value = 0, label }) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className="progress">
      <div className="progress__header">
        <span className="progress__label">{label ?? 'Voortgang'}</span>
        <span className="progress__value">{clamped}% voltooid</span>
      </div>
      <div
        className="progress__track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clamped}
        aria-label={`${clamped}% voltooid`}
      >
        <div className="progress__fill" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  )
}

export default ProgressBar
