export const MODULE_STATUS = {
  NOT_STARTED: 'Nog niet gestart',
  IN_PROGRESS: 'Bezig',
  COMPLETED: 'Afgerond',
  COMING_SOON: 'Binnenkort beschikbaar',
}

/**
 * Alle modules en lessen komen hier.
 * Nieuwe lessen toevoegen: voeg een object toe aan de `lessons`-array
 * van een module. De routes laden die data automatisch.
 */
export const modules = [
  {
    id: 'welkom',
    title: 'Welkom bij Stap voor Stap',
    description:
      'Een rustige eerste kennismaking met Stap voor Stap en deze onboarding.',
    icon: 'sun',
    duration: '5 minuten',
    completionMessage: {
      title: '🌱 De eerste stap is gezet!',
      text: 'Je hebt kennisgemaakt met de onboarding. Tijd voor de volgende stap.',
    },
    lessons: [
      {
        id: 'fijn-dat-je-er-bent',
        title: 'Fijn dat je er bent!',
        summary: 'Een warme kennismaking met Stap voor Stap.',
        content: [
          {
            type: 'imagePlaceholder',
            text: 'Hier komt later een sfeervolle foto van onze zorgboerderij.',
            size: 'wide',
          },
          {
            type: 'paragraph',
            text: 'Wat leuk dat je ons team komt versterken.',
          },
          {
            type: 'paragraph',
            text: 'Bij Stap voor Stap werken we samen aan een veilige en fijne plek waar deelnemers zich kunnen ontwikkelen, ontspannen en meedoen.',
          },
          {
            type: 'paragraph',
            text: 'De eerste dagen komt er veel op je af. Je hoeft daarom niet alles direct te weten of te onthouden.',
          },
          {
            type: 'paragraph',
            text: 'Deze onboarding helpt je stap voor stap op weg.',
          },
          {
            type: 'tip',
            label: '💡 Tip voor je eerste week',
            text: 'Stel gerust vragen. We verwachten niet dat je alles meteen zelfstandig kunt.',
          },
          {
            type: 'signoff',
            text: 'Team Stap voor Stap',
          },
        ],
      },
      {
        id: 'hoe-werkt-deze-onboarding',
        title: 'Zo werkt deze onboarding',
        summary: 'Korte modules, eigen tempo en bewaarde voortgang.',
        content: [
          {
            type: 'paragraph',
            text: 'De onboarding bestaat uit korte modules.',
          },
          {
            type: 'paragraph',
            text: 'Iedere module behandelt één onderwerp. Je kunt tussendoor stoppen en later verdergaan waar je gebleven bent.',
          },
          {
            type: 'paragraph',
            text: 'Je voortgang wordt automatisch bewaard op dit apparaat.',
          },
          {
            type: 'numberedList',
            items: [
              'Bekijk de korte uitleg.',
              'Sta even stil bij de praktijksituatie.',
              'Voer kleine opdrachten of vragen uit.',
              'Rond de module af.',
            ],
          },
          {
            type: 'tip',
            label: '💡 Neem rustig de tijd',
            text: 'Je hoeft de volledige onboarding niet in één keer af te ronden.',
          },
        ],
      },
      {
        id: 'wat-kun-je-verwachten',
        title: 'Wat kun je verwachten?',
        summary: 'Waar je in de komende modules kennis mee maakt.',
        content: [
          {
            type: 'paragraph',
            text: 'Tijdens deze onboarding maak je onder andere kennis met:',
          },
          {
            type: 'bulletList',
            items: [
              'onze visie en manier van werken;',
              'de zorgboerderij en de verschillende plekken;',
              'onze deelnemers;',
              'de dieren;',
              'de dagstart en het digibord;',
              'veiligheid en afspraken;',
              'communicatie en samenwerking.',
            ],
          },
          {
            type: 'assignment',
            label: 'Jouw eerste verwachting',
            text: 'Waar ben je het meest benieuwd naar tijdens je eerste weken bij Stap voor Stap?',
            reflective: true,
          },
        ],
      },
    ],
  },
  {
    id: 'onze-visie',
    title: 'Onze visie',
    description:
      'Leer onze missie en visie kennen en ontdek hoe die zichtbaar worden in de begeleiding.',
    icon: 'heart',
    duration: '12 minuten',
    completionMessage: {
      title: '🌿 Goed gedaan!',
      text: 'Je kent nu onze missie, visie en de belangrijkste uitgangspunten van onze begeleiding.',
    },
    lessons: [
      {
        id: 'onze-missie',
        title: 'Onze missie',
        summary: 'Waar Stap voor Stap voor staat.',
        content: [
          {
            type: 'hero',
            eyebrow: 'Missie & visie',
            title: 'Onze missie',
          },
          {
            type: 'banner',
            text: 'Samen, buiten, gewoon',
          },
          {
            type: 'paragraph',
            text: 'Stap voor Stap is gespecialiseerd in persoonlijke begeleiding en coaching op maat voor kinderen, jongeren en volwassenen die tijdelijk of permanent niet mee kunnen komen in de maatschappij.',
          },
          {
            type: 'paragraph',
            text: 'Dat doen we door dagbesteding, individuele begeleiding, vrijetijdsbesteding, (paarden)coaching en ambulante hulpverlening.',
          },
          {
            type: 'highlight',
            text: 'Begeleiding die past bij de mens, niet andersom.',
          },
        ],
      },
      {
        id: 'onze-visie-kern',
        title: 'Onze visie',
        summary: 'Hoe wij kijken naar mensen, natuur en ontwikkeling.',
        content: [
          {
            type: 'hero',
            eyebrow: 'Missie & visie',
            title: 'Onze visie',
          },
          {
            type: 'banner',
            text: 'Samen, buiten, gewoon — met rust en aandacht, persoonlijk en kleinschalig',
          },
          {
            type: 'paragraph',
            text: 'Wij geloven dat ieder mens eigen mogelijkheden en talenten heeft, uniek is in persoonlijkheid, en dat we daar naar kijken.',
          },
          {
            type: 'paragraph',
            text: 'Leren en ontwikkelen kan overal, zeker in een omgeving die daartoe uitnodigt. Wij geloven in de kracht van de natuur, de omgang met dieren, het buiten zijn en de vrijheid die daarbij hoort.',
          },
          {
            type: 'paragraph',
            text: 'Voor ieder mens is het van belang om voldoening te ervaren. Een zorgboerderij is daar de uitgelezen plek voor. Onze dieren nemen daarbij een speciale plaats in.',
          },
          {
            type: 'signoff',
            text: 'Team Stap voor Stap',
          },
        ],
      },
      {
        id: 'deelnemer-staat-centraal',
        title: 'De deelnemer staat centraal',
        summary: 'Kijken naar de persoon achter het gedrag.',
        content: [
          {
            type: 'paragraph',
            text: 'Bij Stap voor Stap kijken we naar de persoon achter het gedrag.',
          },
          {
            type: 'paragraph',
            text: 'Iedere deelnemer heeft eigen talenten, behoeften, mogelijkheden en grenzen.',
          },
          {
            type: 'paragraph',
            text: 'We sluiten zoveel mogelijk aan bij wat iemand nodig heeft om zich veilig te voelen en mee te kunnen doen.',
          },
          {
            type: 'highlight',
            text: 'Niet iedereen hoeft hetzelfde te doen om erbij te horen.',
          },
        ],
      },
      {
        id: 'kijken-naar-mogelijkheden',
        title: 'Kijken naar mogelijkheden',
        summary: 'Aandacht voor wat iemand al kan.',
        content: [
          {
            type: 'paragraph',
            text: 'We kijken niet alleen naar wat moeilijk is, maar juist ook naar wat iemand al kan.',
          },
          {
            type: 'paragraph',
            text: 'Een kleine stap kan voor een deelnemer een grote overwinning zijn.',
          },
          {
            type: 'paragraph',
            text: 'We bieden ondersteuning waar dat nodig is en ruimte waar dat mogelijk is.',
          },
          {
            type: 'tip',
            label: '💡 Zie ook de kleine successen',
            text: 'Benoem concreet wat goed gaat. Een oprecht compliment kan veel betekenen.',
          },
        ],
      },
      {
        id: 'veiligheid-en-vertrouwen',
        title: 'Veiligheid en vertrouwen',
        summary: 'Rust, duidelijkheid en voorspelbaarheid.',
        content: [
          {
            type: 'paragraph',
            text: 'Ontwikkeling ontstaat wanneer iemand zich veilig en gezien voelt.',
          },
          {
            type: 'paragraph',
            text: 'Daarom werken we rustig, duidelijk en voorspelbaar.',
          },
          {
            type: 'paragraph',
            text: 'We maken afspraken begrijpelijk en komen erop terug wanneer dat nodig is.',
          },
          {
            type: 'expandableAnswer',
            situation:
              'Een deelnemer wil niet beginnen aan een afgesproken activiteit.',
            question:
              'Wat zou je eerst willen weten voordat je de deelnemer opnieuw aanspoort?',
            answerLabel: 'Bekijk een mogelijke richting',
            answer:
              'Denk bijvoorbeeld aan spanning, onduidelijkheid, overprikkeling, vermoeidheid, eerdere ervaringen of de manier waarop de opdracht is aangeboden.',
          },
        ],
      },
      {
        id: 'samen-stap-voor-stap',
        title: 'Samen stap voor stap',
        summary: 'Samenwerken en hulp vragen.',
        content: [
          {
            type: 'paragraph',
            text: 'We werken samen met deelnemers, collega’s en andere betrokkenen.',
          },
          {
            type: 'paragraph',
            text: 'We stemmen af, delen relevante informatie en vragen hulp wanneer dat nodig is.',
          },
          {
            type: 'paragraph',
            text: 'Je hoeft moeilijke situaties niet alleen op te lossen.',
          },
          {
            type: 'cards',
            variant: 'values',
            items: [
              { title: 'Veiligheid', text: 'Rust en voorspelbaarheid bieden houvast.' },
              { title: 'Aandacht', text: 'Echt kijken naar de mens achter het gedrag.' },
              { title: 'Duidelijkheid', text: 'Begrijpelijke afspraken en heldere communicatie.' },
              { title: 'Ontwikkeling', text: 'Kleine stappen tellen en mogen gezien worden.' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'zorgboerderij',
    title: 'De zorgboerderij',
    description:
      'Maak kennis met de omgeving, de werkzaamheden en het dagelijkse ritme.',
    icon: 'barn',
    duration: '8 minuten',
    completionMessage: {
      title: '🏡 Mooi!',
      text: 'Je hebt een eerste beeld van de zorgboerderij en jouw plek binnen de dag.',
    },
    lessons: [
      {
        id: 'plek-om-mee-te-doen',
        title: 'Een plek om mee te doen',
        summary: 'Begeleiding, activiteiten, dieren en buiten zijn.',
        content: [
          {
            type: 'imagePlaceholder',
            text: 'Hier komt later een overzichtsfoto van het erf.',
            size: 'wide',
          },
          {
            type: 'paragraph',
            text: 'De zorgboerderij is een plek waar begeleiding, activiteiten, dieren en buiten zijn samenkomen.',
          },
          {
            type: 'paragraph',
            text: 'Deelnemers krijgen de mogelijkheid om mee te doen op een manier die aansluit bij hun mogelijkheden en doelen.',
          },
          {
            type: 'paragraph',
            text: 'Werkzaamheden zijn geen doel op zichzelf. Ze kunnen helpen bij structuur, zelfvertrouwen, samenwerking, ontspanning en ontwikkeling.',
          },
        ],
      },
      {
        id: 'verschillende-plekken',
        title: 'Verschillende plekken op het erf',
        summary: 'Een overzicht van de belangrijkste plekken.',
        content: [
          {
            type: 'cards',
            variant: 'places',
            items: [
              {
                title: 'Algemene ruimtes',
                text: 'Hier komt later een foto.',
                placeholder: true,
              },
              {
                title: 'Dierenverblijven',
                text: 'Hier komt later een foto.',
                placeholder: true,
              },
              {
                title: 'Buitenruimtes',
                text: 'Hier komt later een foto.',
                placeholder: true,
              },
              {
                title: 'Werk- en klusplekken',
                text: 'Hier komt later een foto.',
                placeholder: true,
              },
              {
                title: 'Rustige plekken',
                text: 'Hier komt later een foto.',
                placeholder: true,
              },
            ],
          },
          {
            type: 'paragraph',
            text: 'Iedere plek heeft eigen afspraken en aandachtspunten. Later in de onboarding komen veiligheid en het werken met dieren uitgebreider aan bod.',
          },
        ],
      },
      {
        id: 'ritme-van-de-dag',
        title: 'Het ritme van de dag',
        summary: 'Voorspelbaarheid geeft rust.',
        content: [
          {
            type: 'paragraph',
            text: 'Een voorspelbaar dagritme geeft deelnemers duidelijkheid en rust.',
          },
          {
            type: 'paragraph',
            text: 'De dag kan onder andere bestaan uit:',
          },
          {
            type: 'timeline',
            items: [
              'ontvangst',
              'dagstart',
              'activiteiten of begeleiding',
              'pauzemomenten',
              'verzorging van dieren',
              'klusjes',
              'gezamenlijke afronding',
            ],
          },
          {
            type: 'highlight',
            text: 'Het precieze programma kan per deelnemer en per dag verschillen.',
          },
        ],
      },
      {
        id: 'jouw-rol-op-het-erf',
        title: 'Jouw rol op het erf',
        summary: 'Bijdragen aan een veilige en overzichtelijke dag.',
        content: [
          {
            type: 'paragraph',
            text: 'Als medewerker draag je bij aan een veilige, prettige en overzichtelijke dag.',
          },
          {
            type: 'paragraph',
            text: 'Dat betekent onder andere:',
          },
          {
            type: 'bulletList',
            items: [
              'aanwezig en benaderbaar zijn;',
              'afspraken en bijzonderheden kennen;',
              'veranderingen tijdig delen;',
              'overzicht houden;',
              'deelnemers ondersteunen zonder alles over te nemen;',
              'hulp vragen bij twijfel.',
            ],
          },
          {
            type: 'tip',
            label: '💡 Eerst afstemmen',
            text: 'Weet je niet zeker wat van jou wordt verwacht? Stem dan eerst af met een collega voordat je handelt.',
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
    duration: 'Binnenkort',
    comingSoon: true,
    lessons: [],
  },
  {
    id: 'deelnemers-begeleiden',
    title: 'Deelnemers begeleiden',
    description: 'Tips en inzichten voor het begeleiden van deelnemers.',
    icon: 'people',
    duration: 'Binnenkort',
    comingSoon: true,
    lessons: [],
  },
  {
    id: 'dagstart-digibord',
    title: 'Dagstart en digibord',
    description: 'Hoe je de dagstart doet en het digibord gebruikt.',
    icon: 'board',
    duration: 'Binnenkort',
    comingSoon: true,
    lessons: [],
  },
  {
    id: 'paarden-dieren',
    title: 'Paarden en dieren',
    description: 'Omgaan met paarden en andere dieren op de boerderij.',
    icon: 'horse',
    duration: 'Binnenkort',
    comingSoon: true,
    lessons: [],
  },
  {
    id: 'klusjes-dagprogramma',
    title: 'Klusjes en dagprogramma',
    description: 'Het dagprogramma en de vaste klusjes op een rij.',
    icon: 'tasks',
    duration: 'Binnenkort',
    comingSoon: true,
    lessons: [],
  },
  {
    id: 'procedures',
    title: 'Procedures',
    description: 'Belangrijke procedures die je moet kennen en volgen.',
    icon: 'list',
    duration: 'Binnenkort',
    comingSoon: true,
    lessons: [],
  },
  {
    id: 'kennistoets',
    title: 'Kennistoets',
    description: 'Test je kennis voordat je verder gaat.',
    icon: 'quiz',
    duration: 'Binnenkort',
    comingSoon: true,
    lessons: [],
  },
  {
    id: 'afronding',
    title: 'Afronding',
    description: 'Rond je onboarding af en bekijk wat je hebt geleerd.',
    icon: 'check',
    duration: 'Binnenkort',
    comingSoon: true,
    lessons: [],
  },
]

export function isModuleAvailable(module) {
  return Boolean(module && !module.comingSoon && module.lessons?.length > 0)
}

export function getAvailableModules() {
  return modules.filter(isModuleAvailable)
}

export function getModuleById(moduleId) {
  return modules.find((module) => module.id === moduleId) ?? null
}

export function getModuleIndex(moduleId) {
  return modules.findIndex((module) => module.id === moduleId)
}

export function getAvailableModuleNumber(moduleId) {
  const available = getAvailableModules()
  const index = available.findIndex((module) => module.id === moduleId)
  return index === -1 ? null : index + 1
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

export function lessonKey(moduleId, lessonId) {
  return `${moduleId}:${lessonId}`
}

export function parseLessonKey(key) {
  if (!key || typeof key !== 'string') return null
  const [moduleId, lessonId] = key.split(':')
  if (!moduleId || !lessonId) return null
  return { moduleId, lessonId }
}
