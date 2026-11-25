// Hiermee kan elk onderdeel van de site het venster "Vraag stellen" openen.
export const OPEN_ASK_QUESTION_EVENT = 'open-ask-question'

export function openAskQuestion() {
  window.dispatchEvent(new Event(OPEN_ASK_QUESTION_EVENT))
}
