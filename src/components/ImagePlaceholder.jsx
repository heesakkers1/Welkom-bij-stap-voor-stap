import './ImagePlaceholder.css'

/**
 * Tijdloze image-component.
 * Zonder `src` toont deze een placeholder; met `src` de echte foto.
 */
function ImagePlaceholder({
  src,
  alt = '',
  caption = 'Hier komt later een foto.',
  size = 'wide',
}) {
  if (src) {
    return (
      <figure className={`media-image media-image--${size}`}>
        <img src={src} alt={alt} />
        {caption ? <figcaption>{caption}</figcaption> : null}
      </figure>
    )
  }

  return (
    <figure
      className={`media-image media-image--${size} media-image--placeholder`}
      role="img"
      aria-label={caption}
    >
      <div className="media-image__frame">
        <span className="media-image__hint">{caption}</span>
      </div>
    </figure>
  )
}

export default ImagePlaceholder
