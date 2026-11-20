/**
 * Toont een tekst uit content.json. Woorden tussen *sterretjes* worden cursief,
 * bijvoorbeeld: Vraag het *‘je hulplijn’*. Met **dubbele sterretjes** worden
 * woorden vetgedrukt.
 */
function RichText({ text }) {
  if (typeof text !== 'string' || !text.includes('*')) return text ?? null
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, index) => {
    if (part.length > 4 && part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>
    }
    if (part.length > 2 && part.startsWith('*') && part.endsWith('*')) {
      return <em key={index}>{part.slice(1, -1)}</em>
    }
    return part
  })
}

export default RichText
