import { voorbereidingFields, voorbereidingItemIds } from './data'

const STORAGE_KEY = 'stap-voor-stap-voorbereiding'
const MAX_LENGTH = 80

/**
 * De checklist bewaart zijn gegevens en vinkjes in het deel van de link na
 * het #-teken. Dat deel gaat nooit naar de server, maar reist wel mee als je
 * de link doorstuurt. Zo ziet de volgende collega precies wat er al gedaan is.
 */
export const emptyVoorbereiding = {
  ...Object.fromEntries(voorbereidingFields.map((field) => [field.id, ''])),
  klaar: [],
}

export function parseVoorbereiding(hash) {
  const params = new URLSearchParams((hash ?? '').replace(/^#/, ''))
  const state = { ...emptyVoorbereiding }
  for (const field of voorbereidingFields) {
    state[field.id] = (params.get(field.id) ?? '').slice(0, MAX_LENGTH)
  }
  state.klaar = (params.get('klaar') ?? '')
    .split(',')
    .filter((id) => voorbereidingItemIds.includes(id))
  return state
}

export function voorbereidingToHash(state) {
  const params = new URLSearchParams()
  for (const field of voorbereidingFields) {
    const value = state[field.id]?.trim()
    if (value) params.set(field.id, value)
  }
  if (state.klaar.length) params.set('klaar', state.klaar.join(','))
  const query = params.toString()
  return query ? `#${query}` : ''
}

export function hasVoorbereidingContent(state) {
  return voorbereidingToHash(state) !== ''
}

/** De laatst gebruikte checklist op dit apparaat, als vangnet. */
export function loadLastVoorbereiding() {
  try {
    return parseVoorbereiding(localStorage.getItem(STORAGE_KEY) ?? '')
  } catch {
    return { ...emptyVoorbereiding }
  }
}

export function saveLastVoorbereiding(state) {
  try {
    const hash = voorbereidingToHash(state)
    if (hash) {
      localStorage.setItem(STORAGE_KEY, hash)
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  } catch {
    // Opslaan lukt niet; de link zelf bewaart de checklist nog steeds.
  }
}
