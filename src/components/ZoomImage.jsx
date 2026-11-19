import { useEffect, useState } from 'react'
import { previewSrc } from './imagePreview'
import './ZoomImage.css'

/**
 * Schermafbeelding die je kunt aantikken om hem groot te bekijken.
 * Handig op de telefoon, waar een plaatje van het Digibord klein is.
 */
function ZoomImage({ src, alt = '', className = '' }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    const oldOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = oldOverflow
    }
  }, [open])

  const url = previewSrc(src)

  return (
    <>
      <button
        type="button"
        className={`zoom-image ${className}`.trim()}
        onClick={() => setOpen(true)}
        aria-label={`${alt || 'Afbeelding'}: tik om groot te bekijken`}
      >
        <img src={url} alt={alt} loading="lazy" />
        <span className="zoom-image__hint" aria-hidden="true">🔍 Vergroot</span>
      </button>
      {open ? (
        <div
          className="zoom-image__overlay"
          role="dialog"
          aria-modal="true"
          aria-label={alt || 'Afbeelding'}
          onClick={() => setOpen(false)}
        >
          <button type="button" className="zoom-image__close" onClick={() => setOpen(false)}>
            ✕ Sluiten
          </button>
          <div className="zoom-image__scroll">
            <img src={url} alt={alt} />
          </div>
        </div>
      ) : null}
    </>
  )
}

export default ZoomImage
