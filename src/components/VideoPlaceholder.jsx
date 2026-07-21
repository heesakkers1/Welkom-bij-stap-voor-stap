import './VideoPlaceholder.css'

/**
 * Tijdloze video-component.
 * Zonder `src` toont deze een placeholder; met `src` een eenvoudige video-player.
 */
function VideoPlaceholder({
  src,
  title = '▶ Video',
  text = 'Hier komt later een video.',
  note,
  poster,
}) {
  if (src) {
    return (
      <figure className="media-video">
        <video
          className="media-video__player"
          controls
          playsInline
          poster={poster}
          src={src}
        >
          Je browser ondersteunt geen video.
        </video>
        {title || text ? (
          <figcaption className="media-video__caption">
            {title ? <strong>{title}</strong> : null}
            {text ? <span>{text}</span> : null}
          </figcaption>
        ) : null}
      </figure>
    )
  }

  return (
    <div
      className="media-video media-video--placeholder"
      role="img"
      aria-label={`${title}. ${text}`}
    >
      <div className="media-video__frame">
        <span className="media-video__play" aria-hidden="true">
          ▶
        </span>
        <p className="media-video__title">{title}</p>
        <p className="media-video__text">{text}</p>
        {note ? <p className="media-video__note">{note}</p> : null}
      </div>
    </div>
  )
}

export default VideoPlaceholder
