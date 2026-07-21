export const MODULE_STATUS = {
  NOT_STARTED: 'Nog niet gestart',
  IN_PROGRESS: 'Bezig',
  COMPLETED: 'Afgerond',
}

export const modules = [
  {
    id: 'welkom',
    title: 'Welkom',
    description: 'Maak kennis met de onboarding en wat je mag verwachten.',
    icon: 'sun',
    status: MODULE_STATUS.NOT_STARTED,
  },
  {
    id: 'zorgboerderij',
    title: 'De zorgboerderij',
    description: 'Leer hoe de boerderij werkt en wat onze werkwijze is.',
    icon: 'barn',
    status: MODULE_STATUS.NOT_STARTED,
  },
  {
    id: 'veilig-werken',
    title: 'Veilig werken',
    description: 'Belangrijke afspraken voor een veilige werkdag.',
    icon: 'shield',
    status: MODULE_STATUS.NOT_STARTED,
  },
  {
    id: 'deelnemers-begeleiden',
    title: 'Deelnemers begeleiden',
    description: 'Tips en inzichten voor het begeleiden van deelnemers.',
    icon: 'people',
    status: MODULE_STATUS.NOT_STARTED,
  },
  {
    id: 'dagstart-digibord',
    title: 'Dagstart en digibord',
    description: 'Hoe je de dagstart doet en het digibord gebruikt.',
    icon: 'board',
    status: MODULE_STATUS.NOT_STARTED,
  },
  {
    id: 'paarden-dieren',
    title: 'Paarden en dieren',
    description: 'Omgaan met paarden en andere dieren op de boerderij.',
    icon: 'horse',
    status: MODULE_STATUS.NOT_STARTED,
  },
  {
    id: 'klusjes-dagprogramma',
    title: 'Klusjes en dagprogramma',
    description: 'Het dagprogramma en de vaste klusjes op een rij.',
    icon: 'tasks',
    status: MODULE_STATUS.NOT_STARTED,
  },
  {
    id: 'procedures',
    title: 'Procedures',
    description: 'Belangrijke procedures die je moet kennen en volgen.',
    icon: 'list',
    status: MODULE_STATUS.NOT_STARTED,
  },
  {
    id: 'kennistoets',
    title: 'Kennistoets',
    description: 'Test je kennis voordat je verder gaat.',
    icon: 'quiz',
    status: MODULE_STATUS.NOT_STARTED,
  },
  {
    id: 'afronding',
    title: 'Afronding',
    description: 'Rond je onboarding af en bekijk wat je hebt geleerd.',
    icon: 'check',
    status: MODULE_STATUS.NOT_STARTED,
  },
]
