/** Nederlandse namen voor de onderdelen en velden in de bewerkpagina. */
export const BLOCK_NAMES = {
  hero: 'Grote kop',
  paragraph: 'Alinea',
  bulletList: 'Opsomming',
  numberedList: 'Genummerde lijst',
  tip: 'Tip',
  highlight: 'Uitgelichte tekst',
  banner: 'Banner',
  assignment: 'Opdracht',
  image: 'Foto',
  imagePlaceholder: 'Plek voor foto',
  video: 'Video',
  videoPlaceholder: 'Plek voor video',
  cards: 'Kaartjes',
  timeline: 'Tijdlijn',
  expandableAnswer: 'Vraag met uitklapbaar antwoord',
  signoff: 'Ondertekening',
}

export const FIELD_NAMES = {
  title: 'Titel',
  text: 'Tekst',
  label: 'Kopje',
  eyebrow: 'Kleine tekst boven de titel',
  summary: 'Korte samenvatting',
  description: 'Beschrijving',
  duration: 'Duur',
  completionMessage: 'Bericht na afronden',
  situation: 'Situatie',
  question: 'Vraag',
  answer: 'Antwoord',
  answerLabel: 'Tekst op de knop voor het antwoord',
  caption: 'Onderschrift',
  alt: 'Omschrijving van de foto (voor wie niet kan zien)',
  note: 'Notitie',
  items: 'Punt',
  brand: 'Kleine tekst bovenaan',
  subtitle: 'Ondertitel',
  intro: 'Introductie',
  imageCaption: 'Tekst bij de foto',
  durationLabel: 'Kopje duur',
  durationValue: 'Totale duur',
  modulesLabel: 'Kopje modules',
  goalLabel: 'Kopje doel',
  goalValue: 'Doel',
  button: 'Tekst op de knop',
}

/** Velden die geen tekst zijn en dus niet in de bewerkpagina staan. */
export const HIDDEN_FIELDS = new Set([
  'id',
  'type',
  'icon',
  'src',
  'poster',
  'size',
  'variant',
  'placeholder',
  'reflective',
  'comingSoon',
  'lessons',
  'content',
])

export function fieldName(key) {
  return FIELD_NAMES[key] ?? key
}
