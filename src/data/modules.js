export const MODULE_STATUS = {
  NOT_STARTED: 'Nog niet gestart',
  IN_PROGRESS: 'Bezig',
  COMPLETED: 'Afgerond',
}

/**
 * Alle modules en lessen komen hier.
 * Nieuwe lessen toevoegen: voeg een object toe aan de `lessons`-array
 * van een module. De routes laden die data automatisch.
 */
export const modules = [
  {
    id: 'welkom',
    title: 'Welkom',
    description: 'Een warme kennismaking met Stap voor Stap en deze onboarding.',
    icon: 'sun',
    status: MODULE_STATUS.NOT_STARTED,
    lessons: [
      {
        id: 'fijn-dat-je-er-bent',
        title: 'Fijn dat je er bent',
        summary: 'Een persoonlijke welkom in de leeromgeving.',
        content: [
          {
            type: 'hero',
            eyebrow: '👋 Fijn dat je er bent!',
            title: 'Welkom bij Stap voor Stap.',
            text: 'Wat leuk dat je ons team komt versterken.',
          },
          {
            type: 'imagePlaceholder',
            text: 'Hier komt later een foto van onze zorgboerderij.',
            size: 'wide',
          },
          {
            type: 'paragraph',
            text: 'Je hoeft niet alles in één keer te leren.\nNeem rustig de tijd.\nDeze leeromgeving helpt je stap voor stap op weg.',
          },
          {
            type: 'videoPlaceholder',
            title: '▶ Welkomstvideo',
            text: 'Hier komt later een korte persoonlijke welkomstvideo.',
            note: 'Dit is de eerste stap van je onboarding.',
          },
          {
            type: 'tip',
            label: '💡 Tip voor je eerste week',
            text: 'Schrijf vragen die tijdens de onboarding bij je opkomen meteen op. Neem ze mee naar je inwerkbegeleider.',
          },
        ],
      },
      {
        id: 'hoe-werkt-deze-onboarding',
        title: 'Hoe werkt deze onboarding?',
        summary: 'Korte lessen, voortgang en wat je onderweg tegenkomt.',
        content: [
          {
            type: 'paragraph',
            text: 'Iedere module bestaat uit korte lessen. Zo kun je in je eigen tempo door de onboarding lopen.',
          },
          {
            type: 'paragraph',
            text: 'Lessen kunnen tekst, foto’s, video’s, praktijkopdrachten en korte vragen bevatten.',
          },
          {
            type: 'paragraph',
            text: 'Je voortgang wordt bijgehouden. Zo zie je altijd waar je bent gebleven en wat je al hebt gedaan.',
          },
          {
            type: 'assignment',
            text: 'Bekijk het dashboard en kies één onderdeel waar je het meest nieuwsgierig naar bent.',
          },
        ],
      },
      {
        id: 'wat-kun-je-verwachten',
        title: 'Wat kun je verwachten?',
        summary: 'Waar je mee kennismaakt in de rest van de onboarding.',
        content: [
          {
            type: 'paragraph',
            text: 'In de komende modules ga je onder andere aan de slag met:',
          },
          {
            type: 'bulletList',
            items: [
              'kennismaken met de zorgboerderij',
              'leren hoe een werkdag verloopt',
              'veilig werken',
              'deelnemers begeleiden',
              'werken met dieren',
              'praktische afspraken en procedures',
            ],
          },
          {
            type: 'paragraph',
            text: 'De onboarding vervangt het persoonlijke inwerken niet. Het helpt je om voorbereid en met meer vertrouwen te beginnen.',
          },
          {
            type: 'paragraph',
            text: 'Fijn dat je erbij bent. We wensen je een warme start toe.',
          },
          {
            type: 'signoff',
            text: 'Team Stap voor Stap',
          },
        ],
      },
    ],
  },
  {
    id: 'zorgboerderij',
    title: 'De zorgboerderij',
    description: 'Leer hoe de boerderij werkt en wat onze werkwijze is.',
    icon: 'barn',
    status: MODULE_STATUS.NOT_STARTED,
    lessons: [
      {
        id: 'voorbeeldles',
        title: 'Voorbeeldles',
        summary: 'Voorbeeldinhoud om de structuur te tonen.',
        content: [
          {
            type: 'paragraph',
            text: 'Dit is een voorbeeldles voor de module De zorgboerderij. Later komt hier echte inhoud.',
          },
        ],
      },
    ],
  },
  {
    id: 'veilig-werken',
    title: 'Veilig werken',
    description: 'Belangrijke afspraken voor een veilige werkdag.',
    icon: 'shield',
    status: MODULE_STATUS.NOT_STARTED,
    lessons: [],
  },
  {
    id: 'deelnemers-begeleiden',
    title: 'Deelnemers begeleiden',
    description: 'Tips en inzichten voor het begeleiden van deelnemers.',
    icon: 'people',
    status: MODULE_STATUS.NOT_STARTED,
    lessons: [],
  },
  {
    id: 'dagstart-digibord',
    title: 'Dagstart en digibord',
    description: 'Hoe je de dagstart doet en het digibord gebruikt.',
    icon: 'board',
    status: MODULE_STATUS.NOT_STARTED,
    lessons: [],
  },
  {
    id: 'paarden-dieren',
    title: 'Paarden en dieren',
    description: 'Omgaan met paarden en andere dieren op de boerderij.',
    icon: 'horse',
    status: MODULE_STATUS.NOT_STARTED,
    lessons: [],
  },
  {
    id: 'klusjes-dagprogramma',
    title: 'Klusjes en dagprogramma',
    description: 'Het dagprogramma en de vaste klusjes op een rij.',
    icon: 'tasks',
    status: MODULE_STATUS.NOT_STARTED,
    lessons: [],
  },
  {
    id: 'procedures',
    title: 'Procedures',
    description: 'Belangrijke procedures die je moet kennen en volgen.',
    icon: 'list',
    status: MODULE_STATUS.NOT_STARTED,
    lessons: [],
  },
  {
    id: 'kennistoets',
    title: 'Kennistoets',
    description: 'Test je kennis voordat je verder gaat.',
    icon: 'quiz',
    status: MODULE_STATUS.NOT_STARTED,
    lessons: [],
  },
  {
    id: 'afronding',
    title: 'Afronding',
    description: 'Rond je onboarding af en bekijk wat je hebt geleerd.',
    icon: 'check',
    status: MODULE_STATUS.NOT_STARTED,
    lessons: [],
  },
]

export function getModuleById(moduleId) {
  return modules.find((module) => module.id === moduleId) ?? null
}

export function getModuleIndex(moduleId) {
  return modules.findIndex((module) => module.id === moduleId)
}

export function getLessonById(moduleId, lessonId) {
  const module = getModuleById(moduleId)
  if (!module) return null

  const lesson = module.lessons.find((item) => item.id === lessonId)
  if (!lesson) return null

  return { module, lesson }
}

export function getLessonNeighbors(moduleId, lessonId) {
  const module = getModuleById(moduleId)
  if (!module) return { previous: null, next: null }

  const index = module.lessons.findIndex((lesson) => lesson.id === lessonId)
  if (index === -1) return { previous: null, next: null }

  return {
    previous: module.lessons[index - 1] ?? null,
    next: module.lessons[index + 1] ?? null,
  }
}
