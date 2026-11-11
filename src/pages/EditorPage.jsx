import { Fragment, useEffect, useId, useMemo, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
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

const SECTION_TITLES = {
  welcome: 'Welkomstpagina',
  dashboard: 'Dashboard',
  categories: 'Categorieën op het dashboard',
  quickLinks: 'Snelkoppelingen',
}

function setAtPath(source, path, value) {
  const copy = structuredClone(source)
  let target = copy
  for (const key of path.slice(0, -1)) {
    target = target[key]
  }
  target[path[path.length - 1]] = value
  return copy
}

function removeAtPath(source, path) {
  const copy = structuredClone(source)
  const list = getAtPath(copy, path.slice(0, -1))
  list.splice(path[path.length - 1], 1)
  return copy
}

/** Lijsten waaruit je niets kunt weghalen of toevoegen, omdat de site op de volgorde rekent. */
const LOCKED_LISTS = new Set(['options'])

/**
 * Een nieuw, leeg punt voor een lijst, in dezelfde vorm als de punten die er al
 * staan: een losse tekst, of een kaartje met dezelfde tekstvelden (titel, tekst).
 */
function newItemFor(list, blockType) {
  if (list.length === 0) return blockType === 'cards' ? { title: '', text: '' } : ''
  if (list.every((item) => typeof item === 'string')) return ''
  const item = {}
  for (const entry of list) {
    if (!entry || typeof entry !== 'object') continue
    for (const [key, value] of Object.entries(entry)) {
      if (typeof value === 'string' && !HIDDEN_FIELDS.has(key)) item[key] = ''
    }
  }
  return item
}

/** Tekstvakken die je zelf aan een les kunt toevoegen, elk met een lege beginvorm. */
const NEW_BLOCKS = [
  {
    type: 'paragraph',
    hint: 'Gewone tekst',
    create: () => ({ type: 'paragraph', text: '' }),
  },
  {
    type: 'bulletList',
    hint: 'Punten onder elkaar',
    create: () => ({ type: 'bulletList', items: [''] }),
  },
  {
    type: 'numberedList',
    hint: 'Stappen met een nummer',
    create: () => ({ type: 'numberedList', items: [''] }),
  },
  {
    type: 'tip',
    hint: 'Vak met een kopje en tekst',
    create: () => ({ type: 'tip', label: '💡 Tip', text: '' }),
  },
  {
    type: 'highlight',
    hint: 'Eén belangrijke zin in een kader',
    create: () => ({ type: 'highlight', text: '' }),
  },
  {
    type: 'cards',
    hint: 'Kaartjes met een titel en tekst',
    create: () => ({ type: 'cards', items: [{ title: '', text: '' }] }),
  },
  {
    type: 'timeline',
    hint: 'Stappen op een lijn, met titel en tekst',
    create: () => ({ type: 'timeline', items: [{ title: '', text: '' }] }),
  },
  {
    type: 'assignment',
    hint: 'Opdracht voor in de praktijk',
    create: () => ({ type: 'assignment', label: 'Praktijkopdracht', text: '', reflective: true }),
  },
]

function insertAtPath(source, listPath, index, item) {
  const copy = structuredClone(source)
  getAtPath(copy, listPath).splice(index, 0, item)
  return copy
}

/** Knop om een nieuw tekstvak in te voegen; eerst kies je wat voor tekstvak. */
function InsertBlock({ onInsert, compact = false }) {
  const [open, setOpen] = useState(false)

  if (!open) {
    return (
      <div className={`editor-add${compact ? ' editor-add--between' : ''}`}>
        <button type="button" className="editor-add__button" onClick={() => setOpen(true)}>
          {compact ? '＋ Hier een tekstvak invoegen' : '＋ Tekstvak toevoegen'}
        </button>
      </div>
    )
  }

  return (
    <div className="editor-insert">
      <p className="editor-insert__question">Wat voor tekstvak wil je toevoegen?</p>
      <div className="editor-insert__options">
        {NEW_BLOCKS.map((option) => (
          <button
            key={option.type}
            type="button"
            className="editor-insert__option"
            onClick={() => {
              setOpen(false)
              onInsert(option.create())
            }}
          >
            <span className="editor-insert__name">{BLOCK_NAMES[option.type]}</span>
            <span className="editor-insert__hint">{option.hint}</span>
          </button>
        ))}
      </div>
      <button type="button" className="editor-link" onClick={() => setOpen(false)}>
        Annuleren
      </button>
    </div>
  )
}

function RemoveButton({ onClick, label = 'Weghalen' }) {
  return (
    <button type="button" className="editor-remove" onClick={onClick}>
      ✕ {label}
    </button>
  )
}

function AddButton({ label, onClick }) {
  const ref = useRef(null)
  function handleClick() {
    // Eerst het nieuwe punt tonen, dan meteen de cursor erin zetten, zodat je
    // direct kunt typen (en op een telefoon het toetsenbord opent).
    flushSync(onClick)
    ref.current?.previousElementSibling?.querySelector('textarea')?.focus()
  }
  return (
    <div className="editor-add" ref={ref}>
      <button type="button" className="editor-add__button" onClick={handleClick}>
        ＋ {label} toevoegen
      </button>
    </div>
  )
}

/**
 * Haalt een hele module of les weg, en ook de verwijzingen ernaar
 * (in de categorieën op het dashboard en in lijstjes met modulelinks).
 */
function removePage(source, moduleIndex, lessonIndex = null) {
  const copy = structuredClone(source)
  const module = copy.modules[moduleIndex]
  const lessonId = lessonIndex === null ? null : module.lessons[lessonIndex].id
  const pointsToRemoved = (item) =>
    item.moduleId === module.id && (lessonId === null || item.lessonId === lessonId)

  if (lessonId === null) {
    copy.modules.splice(moduleIndex, 1)
    for (const category of copy.categories ?? []) {
      category.moduleIds = category.moduleIds.filter((id) => id !== module.id)
    }
  } else {
    module.lessons.splice(lessonIndex, 1)
  }

  for (const otherModule of copy.modules) {
    for (const lesson of otherModule.lessons) {
      for (const block of lesson.content) {
        if (block.type === 'moduleLinks') {
          block.items = block.items.filter((item) => !pointsToRemoved(item))
        }
      }
    }
  }
  return copy
}

function getAtPath(source, path) {
  return path.reduce((value, key) => value?.[key], source)
}

const BOLD_PLACEHOLDER = 'vette tekst'

/** Zet **sterretjes** om de geselecteerde woorden, of haalt ze weg als ze er al staan. */
function toggleBold(text, start, end) {
  let from = start
  let to = end
  while (to > from && /\s/.test(text[to - 1])) to -= 1
  while (from < to && /\s/.test(text[from])) from += 1

  if (text.slice(from - 2, from) === '**' && text.slice(to, to + 2) === '**') {
    return {
      text: text.slice(0, from - 2) + text.slice(from, to) + text.slice(to + 2),
      start: from - 2,
      end: to - 2,
    }
  }
  const inner = from === to ? BOLD_PLACEHOLDER : text.slice(from, to)
  return {
    text: `${text.slice(0, from)}**${inner}**${text.slice(to)}`,
    start: from + 2,
    end: from + 2 + inner.length,
  }
}

function insertTab(text, start, end) {
  return { text: `${text.slice(0, start)}\t${text.slice(end)}`, start: start + 1, end: start + 1 }
}

function rowsFor(value) {
  return Math.max(
    1,
    value.split('\n').reduce((total, line) => total + Math.max(1, Math.ceil(line.length / 70)), 0),
  )
}

function TextField({ label, value, onChange, onRemove }) {
  const id = useId()
  const fieldRef = useRef(null)
  const areaRef = useRef(null)
  const escapedRef = useRef(false)
  const [active, setActive] = useState(false)

  // De knoppen blijven staan tot je in een ander veld gaat typen.
  useEffect(() => {
    if (!active) return undefined
    function handleFocusIn(event) {
      if (!fieldRef.current?.contains(event.target)) setActive(false)
    }
    document.addEventListener('focusin', handleFocusIn)
    return () => document.removeEventListener('focusin', handleFocusIn)
  }, [active])

  function apply(edit) {
    const area = areaRef.current
    if (!area) return
    const result = edit(area.value, area.selectionStart, area.selectionEnd)
    flushSync(() => onChange(result.text))
    area.focus()
    area.setSelectionRange(result.start, result.end)
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      escapedRef.current = true
      return
    }
    if (event.key === 'Tab' && !event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey) {
      // Na Esc werkt Tab weer als "naar het volgende veld".
      if (escapedRef.current) {
        escapedRef.current = false
        return
      }
      event.preventDefault()
      apply(insertTab)
      return
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'b') {
      event.preventDefault()
      apply(toggleBold)
      return
    }
    escapedRef.current = false
  }

  // Houd de cursor in het tekstvak als je op een knop tikt.
  const keepFocus = (event) => event.preventDefault()

  return (
    <div className="editor-field" ref={fieldRef}>
      <div className="editor-field__head">
        <label className="editor-field__label" htmlFor={id}>
          {label}
        </label>
        {onRemove ? <RemoveButton onClick={onRemove} /> : null}
      </div>
      {active ? (
        <div className="editor-format" role="toolbar" aria-label={`Opmaak voor ${label}`}>
          <button
            type="button"
            className="editor-format__button"
            onMouseDown={keepFocus}
            onClick={() => apply(toggleBold)}
          >
            <strong>B</strong> Vet
          </button>
          <button
            type="button"
            className="editor-format__button"
            onMouseDown={keepFocus}
            onClick={() => apply(insertTab)}
          >
            <span aria-hidden="true">⇥</span> Tab
          </button>
          <span className="editor-format__hint">Selecteer woorden en tik op Vet. Een enter maakt een nieuwe regel.</span>
        </div>
      ) : null}
      <textarea
        id={id}
        ref={areaRef}
        value={value}
        rows={rowsFor(value)}
        onFocus={() => setActive(true)}
        onKeyDown={handleKeyDown}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}

/** Toont alle tekstvelden in een stuk content, ook in lijsten en kaartjes. */
function Fields({ value, path, label, onChange, onRemove, onAdd, removeSelf, blockType }) {
  if (typeof value === 'string') {
    return (
      <TextField
        label={label}
        value={value}
        onChange={(next) => onChange(path, next)}
        onRemove={removeSelf}
      />
    )
  }

  if (Array.isArray(value)) {
    const locked = LOCKED_LISTS.has(path[path.length - 1])
    const removable = onRemove && !locked
    const addable = onAdd && !locked
    return (
      <>
        {value.map((item, index) => (
          <Fields
            key={index}
            value={item}
            path={[...path, index]}
            label={`${label} ${index + 1}`}
            onChange={onChange}
            onRemove={onRemove}
            onAdd={onAdd}
            removeSelf={removable ? () => onRemove([...path, index]) : null}
          />
        ))}
        {addable ? (
          <AddButton label={label} onClick={() => onAdd(path, newItemFor(value, blockType))} />
        ) : null}
      </>
    )
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
        onRemove={onRemove}
        onAdd={onAdd}
        blockType={value.type}
      />
    ))
    if (!label) return fields
    return (
      <fieldset className="editor-group">
        <legend>{label}</legend>
        {removeSelf ? (
          <div className="editor-group__remove">
            <RemoveButton onClick={removeSelf} />
          </div>
        ) : null}
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
      {item({ kind: 'categories' }, 'Categorieën op het dashboard')}
      {item({ kind: 'quickLinks' }, 'Snelkoppelingen')}
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

function LessonEditor({ lesson, path, onChange, onRemove, onAdd, onInsert }) {
  const contentRef = useRef(null)
  const contentPath = [...path, 'content']

  function insertBlock(index, block) {
    // Eerst het nieuwe tekstvak tonen, dan de cursor erin zetten, zodat je
    // meteen kunt typen (en op een telefoon het toetsenbord opent).
    flushSync(() => onInsert(contentPath, index, block))
    // Het eerste lege veld, zodat een al ingevuld kopje (zoals bij een tip) blijft staan.
    const textareas = [
      ...(contentRef.current?.querySelectorAll(`[data-block-index="${index}"] textarea`) ?? []),
    ]
    const textarea = textareas.find((field) => field.value === '') ?? textareas[0]
    textarea?.focus()
    textarea?.scrollIntoView({ block: 'center' })
  }

  return (
    <>
      <Fields value={lesson.title} path={[...path, 'title']} label="Titel van de les" onChange={onChange} />
      <Fields value={lesson.summary ?? ''} path={[...path, 'summary']} label="Korte samenvatting" onChange={onChange} />
      <h3 className="editor-subheading">Inhoud van de les</h3>
      <div ref={contentRef}>
        {lesson.content.map((block, index) => {
          const blockPath = [...contentPath, index]
          const blockName = BLOCK_NAMES[block.type] ?? block.type
          return (
            <Fragment key={index}>
              {index > 0 ? (
                <InsertBlock compact onInsert={(newBlock) => insertBlock(index, newBlock)} />
              ) : null}
              <section className="editor-block" data-block-index={index}>
                <div className="editor-block__head">
                  <p className="editor-block__type">{blockName}</p>
                  <RemoveButton
                    label="Tekstvak verwijderen"
                    onClick={() => {
                      if (window.confirm(`Dit tekstvak (${blockName.toLowerCase()}) verwijderen?`)) {
                        onRemove(blockPath)
                      }
                    }}
                  />
                </div>
                {block.type === 'image' && block.src ? (
                  <img src={block.src} alt="" className="editor-block__thumb" />
                ) : null}
                <Fields
                  value={block}
                  path={blockPath}
                  onChange={onChange}
                  onRemove={onRemove}
                  onAdd={onAdd}
                />
              </section>
            </Fragment>
          )
        })}
      </div>
      <InsertBlock onInsert={(newBlock) => insertBlock(lesson.content.length, newBlock)} />
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
  const [navOpen, setNavOpen] = useState(false)
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

  function handleRemove(path) {
    setContent((current) => removeAtPath(current, path))
    setMessage(null)
  }

  function handleAdd(path, item) {
    setContent((current) => setAtPath(current, path, [...getAtPath(current, path), item]))
    setMessage(null)
  }

  function handleInsert(listPath, index, item) {
    setContent((current) => insertAtPath(current, listPath, index, item))
    setMessage(null)
  }

  function handleRemovePage(moduleIndex, lessonIndex = null) {
    const module = content.modules[moduleIndex]
    const question =
      lessonIndex === null
        ? `De hele module "${module.title}" verwijderen, met alle ${module.lessons.length} lessen erin?`
        : `De hele les "${module.lessons[lessonIndex].title}" verwijderen?`
    if (!window.confirm(question)) return
    setContent((current) => removePage(current, moduleIndex, lessonIndex))
    setSelection(lessonIndex === null ? { kind: 'welcome' } : { kind: 'module', moduleIndex })
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
  if (selection.kind in SECTION_TITLES) {
    title = SECTION_TITLES[selection.kind]
    body = Array.isArray(content[selection.kind]) ? (
      content[selection.kind].map((entry, index) => (
        <Fields
          key={index}
          value={entry}
          path={[selection.kind, index]}
          label={entry.title}
          onChange={handleChange}
        />
      ))
    ) : (
      <Fields
        value={content[selection.kind]}
        path={[selection.kind]}
        onChange={handleChange}
        onRemove={handleRemove}
        onAdd={handleAdd}
      />
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
        <div className="editor-danger">
          <RemoveButton
            label="Hele module verwijderen"
            onClick={() => handleRemovePage(selection.moduleIndex)}
          />
        </div>
      </>
    )
  } else {
    const path = ['modules', selection.moduleIndex, 'lessons', selection.lessonIndex]
    const lesson = getAtPath(content, path)
    title = `Les: ${lesson.title}`
    body = (
      <>
        <LessonEditor
          lesson={lesson}
          path={path}
          onChange={handleChange}
          onRemove={handleRemove}
          onAdd={handleAdd}
          onInsert={handleInsert}
        />
        <div className="editor-danger">
          <RemoveButton
            label="Hele les verwijderen"
            onClick={() => handleRemovePage(selection.moduleIndex, selection.lessonIndex)}
          />
        </div>
      </>
    )
  }

  return (
    <div className="editor-layout">
      <header className="editor-bar">
        <div>
          <p className="editor-bar__title">✏️ Teksten bewerken</p>
          <p className="editor-bar__state">
            <span className="editor-bar__state-long">
              {dirty ? 'Je hebt wijzigingen die nog niet zijn opgeslagen.' : 'Alles is opgeslagen.'}
            </span>
            <span className="editor-bar__state-short">
              {dirty ? 'Niet opgeslagen' : 'Opgeslagen ✓'}
            </span>
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
        <aside className={`editor-sidebar${navOpen ? ' is-open' : ''}`}>
          {/* Op een telefoon is de lijst ingeklapt, zodat je meteen de tekstvakken ziet. */}
          <button
            type="button"
            className="editor-sidebar__toggle"
            aria-expanded={navOpen}
            onClick={() => setNavOpen((open) => !open)}
          >
            <span>
              <span className="editor-sidebar__toggle-label">Kies wat je wilt bewerken</span>
              <span className="editor-sidebar__toggle-current">{title}</span>
            </span>
            <span aria-hidden="true">{navOpen ? '▴' : '▾'}</span>
          </button>
          <div className="editor-sidebar__content">
            <Navigation
              content={content}
              selection={selection}
              onSelect={(next) => {
                setSelection(next)
                setNavOpen(false)
                window.scrollTo({ top: 0 })
              }}
            />
            <div className="editor-sidebar__footer">
              <Link to="/" className="editor-link">← Naar de site</Link>
              <button type="button" className="editor-link" onClick={onLogout}>
                Sleutel vergeten op dit apparaat
              </button>
            </div>
          </div>
        </aside>
        <main className="editor-main">
          <h2>{title}</h2>
          <p className="editor-note">
            Tip: zet *sterretjes* om woorden die cursief moeten, bijvoorbeeld *‘je hulplijn’*.
          </p>
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
