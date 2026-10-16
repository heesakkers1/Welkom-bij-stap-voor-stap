import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import LessonContent from '../components/LessonContent'
import {
  TOKEN_URL,
  clearToken,
  connect,
  getStoredToken,
  loadContent,
  saveContent,
  storeToken,
} from '../editor/github'
import { BLOCK_NAMES, HIDDEN_FIELDS, fieldName } from '../editor/labels'
import './EditorPage.css'

function setAtPath(source, path, value) {
  const copy = structuredClone(source)
  let target = copy
  for (const key of path.slice(0, -1)) {
    target = target[key]
  }
  target[path[path.length - 1]] = value
  return copy
}

function getAtPath(source, path) {
  return path.reduce((value, key) => value?.[key], source)
}

function TextField({ label, value, onChange }) {
  const rows = Math.max(1, Math.ceil(value.length / 70))
  return (
    <label className="editor-field">
      <span className="editor-field__label">{label}</span>
      <textarea
        value={value}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}

/** Toont alle tekstvelden in een stuk content, ook in lijsten en kaartjes. */
function Fields({ value, path, label, onChange }) {
  if (typeof value === 'string') {
    return (
      <TextField
        label={label}
        value={value}
        onChange={(next) => onChange(path, next)}
      />
    )
  }

  if (Array.isArray(value)) {
    return value.map((item, index) => (
      <Fields
        key={index}
        value={item}
        path={[...path, index]}
        label={`${label} ${index + 1}`}
        onChange={onChange}
      />
    ))
  }

  if (value && typeof value === 'object') {
    const keys = Object.keys(value).filter((key) => !HIDDEN_FIELDS.has(key))
    const fields = keys.map((key) => (
      <Fields
        key={key}
        value={value[key]}
        path={[...path, key]}
        label={fieldName(key)}
        onChange={onChange}
      />
    ))
    if (!label) return fields
    return (
      <fieldset className="editor-group">
        <legend>{label}</legend>
        {fields}
      </fieldset>
    )
  }

  return null
}

function LoginScreen({ onConnected, initialError }) {
  const [token, setToken] = useState('')
  const [error, setError] = useState(initialError)
  const [busy, setBusy] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const trimmed = token.trim()
    if (!trimmed) return
    setBusy(true)
    setError('')
    try {
      const branch = await connect(trimmed)
      storeToken(trimmed)
      onConnected(trimmed, branch)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="editor editor--login">
      <h1>✏️ Teksten bewerken</h1>
      <p>
        Om teksten op te slaan heb je één keer een persoonlijke sleutel nodig.
        Die maak je zo aan:
      </p>
      <ol className="editor-steps">
        <li>
          Klik op{' '}
          <a href={TOKEN_URL} target="_blank" rel="noreferrer">
            sleutel aanmaken op GitHub
          </a>{' '}
          en log in als dat gevraagd wordt.
        </li>
        <li>
          Kies bij <strong>Repository access</strong> voor{' '}
          <strong>Only select repositories</strong> en selecteer{' '}
          <strong>Welkom-bij-stap-voor-stap</strong>.
        </li>
        <li>
          Controleer bij <strong>Permissions</strong> dat{' '}
          <strong>Contents</strong> op <strong>Read and write</strong> staat.
        </li>
        <li>
          Klik onderaan op <strong>Generate token</strong>, kopieer de sleutel
          en plak hem hieronder.
        </li>
      </ol>
      <form onSubmit={handleSubmit} className="editor-login">
        <label className="editor-field">
          <span className="editor-field__label">Jouw sleutel</span>
          <input
            type="password"
            value={token}
            onChange={(event) => setToken(event.target.value)}
            placeholder="github_pat_…"
            autoComplete="off"
          />
        </label>
        <button type="submit" className="editor-button" disabled={busy}>
          {busy ? 'Even controleren…' : 'Start met bewerken'}
        </button>
        {error ? <p className="editor-message editor-message--error">{error}</p> : null}
      </form>
      <p className="editor-note">
        De sleutel wordt alleen in deze browser bewaard. Je hoeft hem hierna
        niet opnieuw in te vullen.
      </p>
      <Link to="/" className="editor-link">
        ← Terug naar de site
      </Link>
    </main>
  )
}

function Navigation({ content, selection, onSelect }) {
  const isActive = (item) =>
    item.kind === selection.kind &&
    item.moduleIndex === selection.moduleIndex &&
    item.lessonIndex === selection.lessonIndex

  const item = (target, text, className = '') => (
    <button
      type="button"
      className={`editor-nav__item ${className}${isActive(target) ? ' is-active' : ''}`}
      onClick={() => onSelect(target)}
    >
      {text}
    </button>
  )

  return (
    <nav className="editor-nav" aria-label="Kies wat je wilt bewerken">
      <p className="editor-nav__heading">Algemeen</p>
      {item({ kind: 'welcome' }, 'Welkomstpagina')}
      {item({ kind: 'dashboard' }, 'Dashboard')}
      <p className="editor-nav__heading">Modules</p>
      {content.modules.map((module, moduleIndex) => (
        <div key={module.id} className="editor-nav__module">
          {item({ kind: 'module', moduleIndex }, module.title, 'editor-nav__item--module')}
          {module.lessons.map((lesson, lessonIndex) => (
            <div key={lesson.id}>
              {item(
                { kind: 'lesson', moduleIndex, lessonIndex },
                lesson.title,
                'editor-nav__item--lesson',
              )}
            </div>
          ))}
        </div>
      ))}
    </nav>
  )
}

function LessonEditor({ lesson, path, onChange }) {
  return (
    <>
      <Fields value={lesson.title} path={[...path, 'title']} label="Titel van de les" onChange={onChange} />
      <Fields value={lesson.summary ?? ''} path={[...path, 'summary']} label="Korte samenvatting" onChange={onChange} />
      <h3 className="editor-subheading">Inhoud van de les</h3>
      {lesson.content.map((block, index) => {
        const blockPath = [...path, 'content', index]
        return (
          <section key={index} className="editor-block">
            <p className="editor-block__type">{BLOCK_NAMES[block.type] ?? block.type}</p>
            {block.type === 'image' && block.src ? (
              <img src={block.src} alt="" className="editor-block__thumb" />
            ) : null}
            <Fields value={block} path={blockPath} onChange={onChange} />
          </section>
        )
      })}
      <h3 className="editor-subheading">Voorbeeld</h3>
      <div className="editor-preview">
        <LessonContent blocks={lesson.content} lessonId={lesson.id} />
      </div>
    </>
  )
}

function Workspace({ token, branch, onLogout }) {
  const [content, setContent] = useState(null)
  const [saved, setSaved] = useState('')
  const [sha, setSha] = useState('')
  const [selection, setSelection] = useState({ kind: 'welcome' })
  const [message, setMessage] = useState(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    let cancelled = false
    loadContent(token, branch)
      .then((result) => {
        if (cancelled) return
        setContent(result.content)
        setSaved(JSON.stringify(result.content))
        setSha(result.sha)
      })
      .catch((err) => {
        if (!cancelled) setMessage({ type: 'error', text: err.message })
      })
    return () => {
      cancelled = true
    }
  }, [token, branch])

  const dirty = useMemo(
    () => content !== null && JSON.stringify(content) !== saved,
    [content, saved],
  )

  useEffect(() => {
    if (!dirty) return undefined
    function warn(event) {
      event.preventDefault()
    }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])

  function handleChange(path, value) {
    setContent((current) => setAtPath(current, path, value))
    setMessage(null)
  }

  async function handleSave() {
    setBusy(true)
    setMessage(null)
    try {
      const newSha = await saveContent(
        token,
        branch,
        content,
        sha,
        'Teksten aangepast via de bewerkpagina',
      )
      setSha(newSha)
      setSaved(JSON.stringify(content))
      setMessage({
        type: 'success',
        text: 'Opgeslagen! Over één à twee minuten staan de nieuwe teksten op de site.',
      })
    } catch (err) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setBusy(false)
    }
  }

  function handleUndo() {
    if (window.confirm('Alle wijzigingen sinds de laatste keer opslaan weggooien?')) {
      setContent(JSON.parse(saved))
      setMessage(null)
    }
  }

  if (!content) {
    return (
      <main className="editor">
        <h1>✏️ Teksten bewerken</h1>
        {message ? (
          <>
            <p className="editor-message editor-message--error">{message.text}</p>
            <button type="button" className="editor-button editor-button--quiet" onClick={onLogout}>
              Andere sleutel invullen
            </button>
          </>
        ) : (
          <p>Teksten worden geladen…</p>
        )}
      </main>
    )
  }

  let title
  let body
  if (selection.kind === 'welcome' || selection.kind === 'dashboard') {
    title = selection.kind === 'welcome' ? 'Welkomstpagina' : 'Dashboard'
    body = (
      <Fields value={content[selection.kind]} path={[selection.kind]} onChange={handleChange} />
    )
  } else if (selection.kind === 'module') {
    const path = ['modules', selection.moduleIndex]
    const module = getAtPath(content, path)
    title = `Module: ${module.title}`
    body = (
      <>
        <Fields value={module} path={path} onChange={handleChange} />
        {module.lessons.length > 0 ? (
          <p className="editor-note">
            De lessen van deze module vind je links onder de moduletitel.
          </p>
        ) : null}
      </>
    )
  } else {
    const path = ['modules', selection.moduleIndex, 'lessons', selection.lessonIndex]
    const lesson = getAtPath(content, path)
    title = `Les: ${lesson.title}`
    body = <LessonEditor lesson={lesson} path={path} onChange={handleChange} />
  }

  return (
    <div className="editor-layout">
      <header className="editor-bar">
        <div>
          <p className="editor-bar__title">✏️ Teksten bewerken</p>
          <p className="editor-bar__state">
            {dirty ? 'Je hebt wijzigingen die nog niet zijn opgeslagen.' : 'Alles is opgeslagen.'}
          </p>
        </div>
        <div className="editor-bar__actions">
          {dirty ? (
            <button type="button" className="editor-button editor-button--quiet" onClick={handleUndo}>
              Ongedaan maken
            </button>
          ) : null}
          <button
            type="button"
            className="editor-button"
            onClick={handleSave}
            disabled={!dirty || busy}
          >
            {busy ? 'Bezig met opslaan…' : 'Opslaan'}
          </button>
        </div>
      </header>
      {message ? (
        <p className={`editor-message editor-message--${message.type} editor-message--bar`}>
          {message.text}
        </p>
      ) : null}

      <div className="editor-columns">
        <aside className="editor-sidebar">
          <Navigation
            content={content}
            selection={selection}
            onSelect={(next) => {
              setSelection(next)
              window.scrollTo({ top: 0 })
            }}
          />
          <div className="editor-sidebar__footer">
            <Link to="/" className="editor-link">← Naar de site</Link>
            <button type="button" className="editor-link" onClick={onLogout}>
              Sleutel vergeten op dit apparaat
            </button>
          </div>
        </aside>
        <main className="editor-main">
          <h2>{title}</h2>
          {body}
        </main>
      </div>
    </div>
  )
}

function EditorPage() {
  const [token, setToken] = useState('')
  const [branch, setBranch] = useState('')
  const [checking, setChecking] = useState(() => Boolean(getStoredToken()))
  const [error, setError] = useState('')

  useEffect(() => {
    const stored = getStoredToken()
    if (!stored) return
    connect(stored)
      .then((foundBranch) => {
        setToken(stored)
        setBranch(foundBranch)
      })
      .catch((err) => setError(err.message))
      .finally(() => setChecking(false))
  }, [])

  function handleLogout() {
    clearToken()
    setToken('')
    setBranch('')
    setError('')
  }

  if (checking) {
    return (
      <main className="editor">
        <h1>✏️ Teksten bewerken</h1>
        <p>Even controleren…</p>
      </main>
    )
  }

  if (!token) {
    return (
      <LoginScreen
        initialError={error}
        onConnected={(newToken, newBranch) => {
          setToken(newToken)
          setBranch(newBranch)
        }}
      />
    )
  }

  return <Workspace token={token} branch={branch} onLogout={handleLogout} />
}

export default EditorPage
