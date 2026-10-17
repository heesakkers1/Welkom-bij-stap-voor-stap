/**
 * Toont een tekst uit content.json. Woorden tussen *sterretjes* worden cursief,
 * bijvoorbeeld: Vraag het *‘je hulplijn’*.
 */
function RichText({ text }) {
  if (typeof text !== 'string' || !text.includes('*')) return text ?? null
  return text.split(/(\*[^*]+\*)/g).map((part, index) =>
    part.length > 2 && part.startsWith('*') && part.endsWith('*') ? (
      <em key={index}>{part.slice(1, -1)}</em>
    ) : (
      part
    ),
  )
}

export default RichText
