import ImagePlaceholder from './ImagePlaceholder'
import VideoPlaceholder from './VideoPlaceholder'
import './LessonContent.css'

function LessonContentBlock({ block }) {
  switch (block.type) {
    case 'hero':
      return (
        <header className="lesson-block lesson-block--hero">
          {block.eyebrow ? (
            <p className="lesson-block__hero-eyebrow">{block.eyebrow}</p>
          ) : null}
          {block.title ? (
            <h2 className="lesson-block__hero-title">{block.title}</h2>
          ) : null}
          {block.text ? (
            <p className="lesson-block__hero-text">{block.text}</p>
          ) : null}
        </header>
      )

    case 'paragraph':
      return <p className="lesson-block lesson-block--paragraph">{block.text}</p>

    case 'bulletList':
      return (
        <ul className="lesson-block lesson-block--list">
          {(block.items ?? []).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )

    case 'tip':
      return (
        <aside className="lesson-block lesson-block--tip">
          <p className="lesson-block__label">
            {block.label ?? '💡 Tip voor je eerste week'}
          </p>
          <p>{block.text}</p>
        </aside>
      )

    case 'assignment':
      return (
        <aside className="lesson-block lesson-block--assignment">
          <p className="lesson-block__label">
            {block.label ?? 'Praktijkopdracht'}
          </p>
          <p>{block.text}</p>
        </aside>
      )

    case 'image':
    case 'imagePlaceholder':
      return (
        <ImagePlaceholder
          src={block.src}
          alt={block.alt}
          caption={block.text ?? block.caption}
          size={block.size ?? 'wide'}
        />
      )

    case 'video':
    case 'videoPlaceholder':
      return (
        <VideoPlaceholder
          src={block.src}
          poster={block.poster}
          title={block.title ?? '▶ Video'}
          text={block.text}
          note={block.note}
        />
      )

    case 'signoff':
      return (
        <p className="lesson-block lesson-block--signoff">
          {block.text ?? 'Team Stap voor Stap'}
        </p>
      )

    default:
      return null
  }
}

function LessonContent({ blocks = [], lessonId }) {
  return (
    <article className="lesson-content">
      {blocks.map((block, index) => (
        <LessonContentBlock key={`${lessonId}-${index}`} block={block} />
      ))}
    </article>
  )
}

export default LessonContent
