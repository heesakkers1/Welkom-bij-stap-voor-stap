const STORAGE_KEY = 'stap-voor-stap-checklists'

/**
 * Afvinklijsten bewaren hun vinkjes alleen op dit apparaat.
 * Zonder opslag (privévenster, geblokkeerde opslag) werkt een lijst
 * gewoon, alleen onthoudt hij de vinkjes dan niet.
 */
function readAll() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

export function loadChecklist(id) {
  const items = readAll()[id]
  return Array.isArray(items) ? items : []
}

export function saveChecklist(id, checkedItems) {
  try {
    const all = readAll()
    all[id] = checkedItems
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
  } catch {
    // Opslaan lukt niet; de vinkjes blijven alleen staan zolang de pagina open is.
  }
}

export function clearChecklists() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Niets te wissen.
  }
}
