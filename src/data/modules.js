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
            type: 'image',
            src: '/fotos/Imara-geitjes.jpeg',
            alt: 'Imara met geitjes',
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
              'onze organisatie en bij wie je terechtkunt;',
              'de zorgboerderij en het ritme van de dag;',
              'hoe we werken met het digibord;',
              'de dagstart en de klusjes;',
              'veilig werken, privacy en meldcodes;',
              'het begeleiden van deelnemers en rapporteren;',
              'onze systemen en praktische afspraken;',
              'jouw functie en je ontwikkeling.',
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
    id: 'organisatie',
    title: 'Wie is wie?',
    description:
      'Voor wie we er zijn, hoe we samenwerken en bij wie je terechtkunt.',
    icon: 'compass',
    duration: '8 minuten',
    completionMessage: {
      title: '🧭 Je weet de weg!',
      text: 'Je weet nu voor wie we er zijn en bij wie je met je vragen terechtkunt.',
    },
    lessons: [
      {
        id: 'voor-wie-we-er-zijn',
        title: 'Voor wie we er zijn',
        summary: 'Onze doelgroepen en ons zorgaanbod.',
        content: [
          {
            type: 'paragraph',
            text: 'Bij Zorgboerderij Stap voor Stap werken we met kinderen, jongeren, volwassenen en ouderen die behoefte hebben aan begeleiding, structuur en een zinvolle daginvulling.',
          },
          {
            type: 'paragraph',
            text: 'Dit zijn bijvoorbeeld mensen met een verstandelijke beperking, psychische kwetsbaarheid, autisme, ontwikkelings- of gedragsvragen, of mensen die (tijdelijk) zijn vastgelopen in school, werk of het dagelijks leven.',
          },
          {
            type: 'paragraph',
            text: 'Ons zorgaanbod:',
          },
          {
            type: 'cards',
            items: [
              { title: 'Dagbesteding' },
              { title: 'Individuele begeleiding' },
              { title: 'Ambulante begeleiding' },
              { title: 'Paardencoaching' },
              { title: 'Vrijetijdsbesteding' },
            ],
          },
          {
            type: 'highlight',
            text: 'Geen standaardtrajecten, maar begeleiding die aansluit bij de persoon.',
          },
        ],
      },
      {
        id: 'onze-cultuur',
        title: 'Onze cultuur',
        summary: 'Een warme, open en informele familiesfeer.',
        content: [
          {
            type: 'paragraph',
            text: 'Binnen Stap voor Stap werken we vanuit een warme, open en informele familiesfeer.',
          },
          {
            type: 'paragraph',
            text: 'We hebben een platte organisatie. Iedereen is gelijk en er is weinig hiërarchie. De lijnen zijn kort en de deur staat altijd open, waardoor we makkelijk met elkaar in contact staan.',
          },
          {
            type: 'paragraph',
            text: 'We vinden het belangrijk dat iedereen zichzelf kan zijn en zich welkom en gezien voelt binnen het team. Collega’s helpen elkaar, denken met elkaar mee en staan voor elkaar klaar.',
          },
          {
            type: 'highlight',
            text: 'Iedereen draagt op zijn eigen manier bij aan het geheel, ongeacht functie of rol.',
          },
          {
            type: 'tip',
            label: '💡 Vragen?',
            text: 'Heb je vragen of loop je ergens tegenaan? Weet dan vooral je collega’s te vinden of loop even binnen op kantoor.',
          },
        ],
      },
      {
        id: 'wie-benader-je-waarvoor',
        title: 'Wie benader je waarvoor?',
        summary: 'Het juiste aanspreekpunt voor je vraag.',
        content: [
          {
            type: 'paragraph',
            text: 'De directie bestaat uit Anne Stottelaar en Bente Kuipers. Jaap Reckers verzorgt de backoffice en Hilde Thoonen is onze externe HR.',
          },
          {
            type: 'paragraph',
            text: 'Met deze vragen kun je bij de volgende personen terecht:',
          },
          {
            type: 'cards',
            items: [
              { title: 'Dagelijkse begeleiding', text: 'Bente' },
              { title: 'Rooster', text: 'Bente of Sanne' },
              { title: 'Verlof', text: 'Sanne' },
              { title: 'Ziekte en verzuim', text: 'Bente of Sanne' },
              { title: 'Salaris en arbeidsvoorwaarden', text: 'Bente en Jaap' },
              { title: 'HR', text: 'Bente en Hilde' },
              { title: 'Vertrouwelijke zaken', text: 'Josee' },
              { title: 'Stage', text: 'Sanne' },
              { title: 'Administratie', text: 'Jaap' },
              { title: 'Facilitair', text: 'Anne en Bert' },
              { title: 'Dieren', text: 'Anne' },
            ],
          },
          {
            type: 'paragraph',
            text: 'De e-mailadressen vind je in het Handboek collega’s (hoofdstuk 1.6).',
          },
          {
            type: 'paragraph',
            text: 'Zorgboerderij Stap voor Stap\nVogelsven 7, 5491 RM Sint-Oedenrode\n06 - 28 53 06 13\ninfo@zorgboerderijstapvoorstap.nl',
          },
        ],
      },
      {
        id: 'vertrouwenspersoon',
        title: 'De vertrouwenspersoon',
        summary: 'Een veilige plek voor lastige of gevoelige vragen.',
        content: [
          {
            type: 'paragraph',
            text: 'Soms speelt er iets wat je niet direct op de werkvloer wilt bespreken. Daarvoor kun je altijd terecht bij onze interne vertrouwenspersoon Josee Hoogenboom.',
          },
          {
            type: 'paragraph',
            text: 'Zij is er voor medewerkers, vrijwilligers en stagiaires. Informatie wordt vertrouwelijk behandeld en niet gedeeld zonder toestemming.',
          },
          {
            type: 'paragraph',
            text: 'Wil je liever met iemand buiten de organisatie praten? Dan kun je de externe, onafhankelijke vertrouwenspersoon van de Federatie Landbouw en Zorg benaderen via de ZLTO informatielijn: 073 - 2173333 of info@zlto.nl.',
          },
          {
            type: 'tip',
            label: '💡 Goed om te weten',
            text: 'Je hoeft een vervelende situatie niet alleen te dragen. Een gesprek met de vertrouwenspersoon kan altijd.',
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
    id: 'digibord',
    title: 'Hoe werken we met het Digibord?',
    description:
      'Wat er op het digibord staat en hoe je het stap voor stap gebruikt tijdens de dag.',
    icon: 'board',
    duration: '10 minuten',
    completionMessage: {
      title: '📋 Digibord-proof!',
      text: 'Je weet nu wat er op het digibord staat en hoe je klussen bijhoudt.',
    },
    lessons: [
      {
        id: 'wat-is-het-digibord',
        title: 'Wat is het digibord?',
        summary: 'Eén scherm met het overzicht van de dag.',
        content: [
          {
            type: 'paragraph',
            text: 'Het digibord is ons digitale overzicht van de dag. Tijdens de dagstart staat het centraal op het scherm. Met hulp van het digibord verloopt de dagstart steeds efficiënter.',
          },
          {
            type: 'paragraph',
            text: 'Op de startpagina van de Dagstart kies je waar je wilt beginnen:',
          },
          {
            type: 'cards',
            items: [
              { title: '☀️ Overzicht vandaag', text: 'Belangrijk vandaag, wie er niet is en het dagprogramma.' },
              { title: '📋 Bijzonderheden', text: 'Meldingen en reminders, per onderwerp.' },
              { title: '👥 Aanwezigheid', text: 'Wie er vandaag is en hoe de groepen zijn ingedeeld.' },
              { title: '📅 Dagprogramma', text: 'De dag in tijdsblokken, met de groepen en klussen.' },
              { title: '🐎 Klusjes per dierengroep', text: 'De klussen voor paarden, ezels, kleinvee, vogels en de dagelijkse klusjes.' },
              { title: '🪪 Deelnemerskaart', text: 'De dag van één deelnemer op één kaart.' },
              { title: '🧑‍🏫 Begeleidingskaart', text: 'De dag van één begeleider op één kaart.' },
            ],
          },
          {
            type: 'tip',
            label: '💡 Begin bij het overzicht',
            text: 'Twijfel je waar je moet kijken? Begin bij Overzicht vandaag. Daar zie je in één keer wat er vandaag belangrijk is.',
          },
        ],
      },
      {
        id: 'overzicht-en-bijzonderheden',
        title: 'Overzicht vandaag en bijzonderheden',
        summary: 'Weten wat er vandaag speelt.',
        content: [
          {
            type: 'paragraph',
            text: 'Op Overzicht vandaag zie je drie dingen:',
          },
          {
            type: 'bulletList',
            items: [
              'Belangrijk vandaag: de meldingen die je vandaag echt moet weten;',
              'Wie is er niet?: welke collega’s en deelnemers er vandaag niet zijn;',
              'Dagprogramma: hoe de dag eruitziet.',
            ],
          },
          {
            type: 'paragraph',
            text: 'Bij Bijzonderheden staan de meldingen per onderwerp, bijvoorbeeld Dieren, Deelnemers & Begeleiding, Algemene reminders, Koffiekraam en Extra taken.',
          },
          {
            type: 'highlight',
            text: 'Wat je op het digibord zet, kunnen anderen meelezen. Schrijf feitelijk en deel alleen wat nodig is voor het werk.',
          },
        ],
      },
      {
        id: 'kaarten',
        title: 'De deelnemerskaart en begeleidingskaart',
        summary: 'Ieders dag op één kaart.',
        content: [
          {
            type: 'paragraph',
            text: 'Op de deelnemerskaart kies je een deelnemer. Je ziet dan onder andere zijn of haar rooster, het dagprogramma van vandaag, de klusjes en het dierengroepje van deze ochtend.',
          },
          {
            type: 'paragraph',
            text: 'Deelnemers kunnen op hun kaart ook een smiley kiezen bij “Hoe voel je je vandaag?” en iets doorgeven bij “Wil je nog iets tegen begeleiding zeggen?”.',
          },
          {
            type: 'paragraph',
            text: 'Op de begeleidingskaart kies je een collega. Je ziet zijn of haar rooster, groepje, klussen, individuele begeleidingen en persoonlijke reminders.',
          },
        ],
      },
      {
        id: 'klussen-op-het-digibord',
        title: 'Klussen op het digibord',
        summary: 'Incidentele en dagelijkse klussen bijhouden.',
        content: [
          {
            type: 'paragraph',
            text: 'Op het digibord staan twee soorten klussen: dagelijkse klussen en incidentele (extra) klussen. Ze werken net iets anders.',
          },
          {
            type: 'cards',
            items: [
              {
                title: 'Dagelijkse klus',
                text: 'Zet een vinkje als hij gedaan is. Deze verwijder je niet!',
              },
              {
                title: 'Incidentele klus',
                text: 'Is de klus gedaan? Verwijder hem dan van het bord.',
              },
            ],
          },
          {
            type: 'paragraph',
            text: 'Daarnaast is er de klussenlijst voor kleinvee en paarden, geplastificeerd in de unit en in SharePoint. Die lijst is de basis waar we vanuit werken. Onderling schuiven is geen probleem.',
          },
          {
            type: 'tip',
            label: '💡 Sleep de klus naar je tijdsblok',
            text: 'Sleep een klus in het dagprogramma naar het tijdsblok waarin je hem gaat doen. Dat geeft veel rust en overzicht, voor jou en voor je collega’s.',
          },
        ],
      },
      {
        id: 'zo-werk-je-ermee',
        title: 'Zo werk je met het digibord',
        summary: 'Het digibord stap voor stap door de dag.',
        content: [
          {
            type: 'numberedList',
            items: [
              'Tijdens de dagstart staat het digibord centraal op het scherm. Samen loop je het door.',
              'Kijk bij Overzicht vandaag wat er belangrijk is en wie er niet is.',
              'Lees de bijzonderheden die voor jouw werk gelden, zoals bij de dieren.',
              'Kijk in het dagprogramma en op je begeleidingskaart wat jouw groepje en jouw klussen zijn.',
              'Sleep de klussen naar het tijdsblok waarin je ze gaat doen.',
              'Klus gedaan? Dagelijkse klus: vinkje zetten. Incidentele klus: verwijderen.',
              'Pas je iets aan, bijvoorbeeld de keuzemomenten van deelnemers? Doe dat bewust en controleer of het klopt.',
            ],
          },
          {
            type: 'quiz',
            question: 'Je hebt een incidentele klus afgerond. Wat doe je op het digibord?',
            options: [
              'Een vinkje zetten en laten staan',
              'De klus verwijderen van het bord',
              'Niets, iemand anders ruimt het op',
            ],
            correct: 1,
            explanation:
              'Een incidentele klus verwijder je als hij gedaan is. Alleen bij een dagelijkse klus zet je een vinkje en laat je hem staan.',
          },
          {
            type: 'assignment',
            label: 'Praktijkopdracht',
            text: 'Zoek op het digibord je eigen begeleidingskaart op. Welke klussen staan er vandaag voor jou? Sleep er één naar het tijdsblok waarin je hem gaat doen.',
            reflective: true,
          },
        ],
      },
    ],
  },
  {
    id: 'dagstart-digibord',
    title: 'De dagstart',
    description: 'Hoe de dagstart verloopt en hoe we samen rust in de groep houden.',
    icon: 'sun',
    duration: '6 minuten',
    completionMessage: {
      title: '☀️ Klaar voor de dagstart!',
      text: 'Je weet nu hoe de dagstart verloopt en hoe we samen rust in de groep houden.',
    },
    lessons: [
      {
        id: 'de-dagstart',
        title: 'De dagstart',
        summary: 'Een vaste structuur voor een rustig begin.',
        content: [
          {
            type: 'paragraph',
            text: 'Iedere dag begint met een dagstart. Die heeft een vaste structuur en met hulp van het digibord verloopt hij steeds efficiënter.',
          },
          {
            type: 'paragraph',
            text: 'Onderdelen van de dagstart zijn:',
          },
          {
            type: 'bulletList',
            items: [
              'centraal, met het scherm;',
              'telefoon;',
              'voorbereiding;',
              'structuur;',
              'deelnemers;',
              'personeel: hoe zit je erbij?',
            ],
          },
          {
            type: 'paragraph',
            text: 'Op vrijdag werken we ook met de vaste dagstructuur en blokken.',
          },
          {
            type: 'tip',
            label: '💡 Voorbereiding helpt',
            text: 'Een goede voorbereiding door de dagleidende helpt enorm om de dagstart soepel te laten verlopen.',
          },
        ],
      },
      {
        id: 'prikkelarme-dagstart',
        title: 'Een rustige, prikkelarme dagstart',
        summary: 'Afspraken die zorgen voor rust in de groep.',
        content: [
          {
            type: 'paragraph',
            text: 'We houden de dagstart zo prikkelarm mogelijk. Daar helpen deze afspraken bij:',
          },
          {
            type: 'bulletList',
            items: [
              'een bewuste groepskeuze;',
              'geen ouders binnen tijdens de dagstart;',
              'collega’s gaan op tijd uit de ruimte;',
              'deelnemers zo snel mogelijk laten zitten.',
            ],
          },
          {
            type: 'highlight',
            text: 'Tijdens de dagstart weiden we niet lang uit over individuele deelnemers.',
          },
          {
            type: 'paragraph',
            text: 'Speelt er iets groots rond een deelnemer? Dan wordt die deelnemer op de agenda van het maandelijkse DB-overleg gezet. Zo kunnen we strak door de dagstart heen.',
          },
        ],
      },
      {
        id: 'leiding-nemen',
        title: 'Leiding nemen op de DB',
        summary: 'Durf knopen door te hakken.',
        content: [
          {
            type: 'paragraph',
            text: 'Op de dagbesteding (DB) is het belangrijk dat er iemand de leiding neemt en knopen doorhakt. Dat geeft rust voor de groep.',
          },
          {
            type: 'paragraph',
            text: 'Niet iedereen voelt zich daar meteen zeker genoeg voor. Toch is iedereen uitgenodigd om dit wel te doen.',
          },
          {
            type: 'paragraph',
            text: 'Samen houden we de afspraken over de dagstructuur in de gaten. Dat is ieders verantwoordelijkheid.',
          },
          {
            type: 'assignment',
            label: 'Praktijkopdracht',
            text: 'Kijk tijdens je eerstvolgende dagstart mee. Welke onderdelen herken je? Wat doet de dagleidende om de dagstart rustig te houden?',
            reflective: true,
          },
        ],
      },
    ],
  },
  {
    id: 'klusjes-dagprogramma',
    title: 'Klusjes en dagprogramma',
    description: 'De klussenlijst, de staldienst en samen de boerderij netjes houden.',
    icon: 'tasks',
    duration: '7 minuten',
    completionMessage: {
      title: '🧹 Top!',
      text: 'Je weet nu waar de klussenlijst ligt en wat er bij de staldienst hoort.',
    },
    lessons: [
      {
        id: 'klussenlijst',
        title: 'De lijst met dagelijkse klussen',
        summary: 'Een basis voor kleinvee en paarden.',
        content: [
          {
            type: 'paragraph',
            text: 'Voor zowel kleinvee als paarden is er een lijst met dagelijkse klussen. Het doel van de lijst is dat je bij vervanging weet hoe het zit.',
          },
          {
            type: 'paragraph',
            text: 'Onderling schuiven met klussen is geen probleem. De lijst is de basis waar we vanuit werken.',
          },
          {
            type: 'bulletList',
            items: [
              'De lijst ligt geplastificeerd in de unit.',
              'De lijst staat ook in SharePoint. Iedereen mag daar veranderingen verwerken.',
              'Kom je er niet uit? Schakel dan Anne S in.',
            ],
          },
        ],
      },
      {
        id: 'staldienst',
        title: 'De staldienst',
        summary: 'Wat je doet als je staldienst hebt.',
        content: [
          {
            type: 'paragraph',
            text: 'Heb je staldienst? Dan doe je de volgende taken:',
          },
          {
            type: 'numberedList',
            items: [
              'Met een emmer warm water en een spons de waterbakken dagelijks uitdoen.',
              'Met een vaatdoek en een emmer warm water dagelijks een doekje door de voerbakken halen.',
              'Met de spinnenragger in alle ruimtes de spinnenwebben weghalen, ook in de voerhokken.',
              'Vegen op de bestrating en voor de stallen.',
              'De fronten van de stallen schoonmaken.',
              'Vegen in de ruimtes.',
              'Prullenbak legen.',
            ],
          },
          {
            type: 'tip',
            label: '💡 Rondje lopen',
            text: 'Loop een rondje door de stallen en om het gebouw heen. Zichtbare verontreiniging haal je weg met de handveger, en waar nodig met een emmer water en een borstel of vaatdoek.',
          },
        ],
      },
      {
        id: 'samen-netjes',
        title: 'Samen de boerderij netjes houden',
        summary: 'Poetsen, opruimen en de kraam.',
        content: [
          {
            type: 'paragraph',
            text: 'Een schone en opgeruimde boerderij doen we samen. Let vooral op deze punten:',
          },
          {
            type: 'cards',
            items: [
              {
                title: 'Poetsen van de ruimtes',
                text: 'Werk met de poetslijst. Vergeet de kleine dingen niet, zoals papieren handdoekjes aanvullen.',
              },
              {
                title: 'Opruimen na de pauzes',
                text: 'Betrek deelnemers actief bij het opruimen. Fruitschillen breng je meteen weg.',
              },
              {
                title: 'Koffiekar en productenkraam',
                text: 'De ezels- of kleinveegroep checkt dagelijks of er iets schoongemaakt moet worden. Bij regen gaan kwetsbare producten naar binnen.',
              },
            ],
          },
          {
            type: 'highlight',
            text: 'Het precieze programma verschilt per dag. Kijk op het digibord welke klussen er vandaag zijn.',
          },
        ],
      },
    ],
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
    id: 'veilig-werken',
    title: 'Veilig werken',
    description: 'Veiligheid, incidenten melden, BHV, privacy en meldcodes.',
    icon: 'shield',
    duration: '12 minuten',
    completionMessage: {
      title: '🛡️ Veilig op weg!',
      text: 'Je weet nu wat je doet bij onveilige situaties, incidenten en zorgen.',
    },
    lessons: [
      {
        id: 'veiligheid-voorop',
        title: 'Veiligheid staat voorop',
        summary: 'Samen alert op risico’s.',
        content: [
          {
            type: 'paragraph',
            text: 'Binnen Stap voor Stap staat veiligheid altijd voorop. We werken samen aan een veilige omgeving voor deelnemers, collega’s en bezoekers.',
          },
          {
            type: 'paragraph',
            text: 'De organisatie werkt met een actuele Risico-Inventarisatie en Evaluatie (RI&E). Daarin staan de belangrijkste risico’s op de zorgboerderij en de maatregelen die we nemen.',
          },
          {
            type: 'paragraph',
            text: 'We verwachten dat je op de hoogte bent van de risico’s binnen jouw werkzaamheden en daar zorgvuldig mee omgaat.',
          },
          {
            type: 'highlight',
            text: 'Zie je een onveilige situatie? Signaleer en bespreek het direct met een collega of je leidinggevende.',
          },
        ],
      },
      {
        id: 'incidenten-melden',
        title: 'Incidenten melden',
        summary: 'Ook een bijna-incident is belangrijk.',
        content: [
          {
            type: 'numberedList',
            items: [
              'Onderneem direct actie. Zorg eerst voor de veiligheid van jezelf en anderen.',
              'Schakel indien nodig hulp in en verleen eerste hulp.',
              'Meld het incident altijd bij je leidinggevende.',
              'Leg het zo snel mogelijk vast in ZilliZ via het incidentmeldingsformulier.',
            ],
          },
          {
            type: 'paragraph',
            text: 'Door incidenten zorgvuldig te registreren kunnen we situaties evalueren, ervan leren en herhaling proberen te voorkomen.',
          },
          {
            type: 'tip',
            label: '💡 Twijfel je?',
            text: 'Twijfel je of iets een incident is? Meld het dan altijd. Ook een bijna-incident is belangrijk om te melden.',
          },
        ],
      },
      {
        id: 'bhv-en-calamiteiten',
        title: 'BHV en calamiteiten',
        summary: 'Rustig blijven en instructies opvolgen.',
        content: [
          {
            type: 'paragraph',
            text: 'Er zijn opgeleide bedrijfshulpverleners (BHV’ers) aanwezig. Zij weten hoe te handelen bij ongevallen, brand of een evacuatie. Je volgt hun aanwijzingen altijd op.',
          },
          {
            type: 'paragraph',
            text: 'Vluchtwegen, nooduitgangen en blusmiddelen moeten altijd vrij en toegankelijk blijven.',
          },
          {
            type: 'paragraph',
            text: 'Zorg ervoor dat je weet:',
          },
          {
            type: 'bulletList',
            items: [
              'waar de nooduitgangen en vluchtroutes zijn;',
              'waar de blusmiddelen zich bevinden;',
              'wie de BHV’ers zijn;',
              'wat je moet doen bij een evacuatie.',
            ],
          },
          {
            type: 'highlight',
            text: 'Bij twijfel: veiligheid gaat altijd voor.',
          },
          {
            type: 'assignment',
            label: 'Praktijkopdracht',
            text: 'Loop een rondje over het erf. Zoek de nooduitgangen, de blusmiddelen en de BHV-tas op, en vraag wie er vandaag BHV’er is.',
          },
        ],
      },
      {
        id: 'epileptische-aanval',
        title: 'Als een deelnemer een aanval krijgt',
        summary: 'De eerste stappen bij een insult.',
        content: [
          {
            type: 'paragraph',
            text: 'Krijgt een deelnemer een epileptische aanval (insult)? Dan volg je deze stappen:',
          },
          {
            type: 'numberedList',
            items: [
              'Check als eerste de tijd.',
              'Verplaats andere deelnemers naar een veilige plek.',
              'Bel direct een collega. Je mag ook een deelnemer een collega laten halen.',
              'Geen gehoor? Gebruik de noodtoeter. Die ligt in de BHV-tas in de unit en boven de kachel in de mancave.',
              'Volg daarna samen met je collega het protocol van de deelnemer.',
            ],
          },
          {
            type: 'paragraph',
            text: 'Voor een aantal deelnemers is er een eigen protocol, soms met noodmedicatie die zij bij zich dragen. Vraag je collega’s voor welke deelnemers dit geldt en waar het protocol te vinden is.',
          },
        ],
      },
      {
        id: 'privacy-avg',
        title: 'Privacy en AVG',
        summary: 'Zorgvuldig omgaan met persoonsgegevens.',
        content: [
          {
            type: 'paragraph',
            text: 'We gaan zorgvuldig om met alle persoonsgegevens van deelnemers en medewerkers. We werken volgens de AVG en gebruiken gegevens alleen wanneer dat nodig is voor goede begeleiding en zorg.',
          },
          {
            type: 'paragraph',
            text: 'Let bijvoorbeeld op het volgende:',
          },
          {
            type: 'bulletList',
            items: [
              'Bespreek deelnemers niet waar anderen kunnen meeluisteren.',
              'Laat dossiers of schermen met persoonsgegevens niet onbeheerd openstaan.',
              'Deel geen foto’s of informatie over deelnemers via je privételefoon of social media.',
              'Controleer altijd of je informatie naar de juiste persoon stuurt.',
            ],
          },
          {
            type: 'paragraph',
            text: 'Heb je een (vermoeden van een) datalek? Meld het direct bij je leidinggevende.',
          },
          {
            type: 'tip',
            label: '💡 Twijfel je?',
            text: 'Twijfel je of je iets mag delen? Vraag het eerst aan je leidinggevende.',
          },
        ],
      },
      {
        id: 'meldcodes',
        title: 'Zorgen over een deelnemer',
        summary: 'Werken met meldcodes.',
        content: [
          {
            type: 'paragraph',
            text: 'We werken met meldcodes en richtlijnen voor situaties waarin er zorgen zijn over de veiligheid of het welzijn van een deelnemer. Ze helpen je om signalen op tijd te herkennen, bespreekbaar te maken en zorgvuldig te handelen.',
          },
          {
            type: 'paragraph',
            text: 'Je vindt de meldcodes en protocollen in ZilliZ → Intranet → Protocollen.',
          },
          {
            type: 'numberedList',
            items: [
              'Blijf niet met je zorgen rondlopen.',
              'Bespreek je zorgen met je leidinggevende of een collega.',
              'Kijk bij twijfel het protocol of de meldcode na.',
              'Volg de stappen uit de meldcode en leg belangrijke signalen en afspraken zorgvuldig vast.',
            ],
          },
          {
            type: 'highlight',
            text: 'Je hoeft niet zelf te bepalen wat er precies aan de hand is. Je hoeft een zorg niet alleen op te lossen.',
          },
        ],
      },
    ],
  },
  {
    id: 'deelnemers-begeleiden',
    title: 'Deelnemers begeleiden',
    description:
      'Het begeleidingsplan, de persoonlijk begeleider, rapporteren en je professionele houding.',
    icon: 'people',
    duration: '10 minuten',
    completionMessage: {
      title: '🤝 Sterk bezig!',
      text: 'Je weet nu hoe we deelnemers begeleiden en hoe je goed rapporteert.',
    },
    lessons: [
      {
        id: 'persoonlijk-begeleider',
        title: 'Persoonlijk begeleider en begeleidingsplan',
        summary: 'Wie het vaste aanspreekpunt is en waar de afspraken staan.',
        content: [
          {
            type: 'paragraph',
            text: 'Iedere deelnemer heeft een persoonlijk begeleider. Dat is het vaste aanspreekpunt voor de deelnemer en betrokkenen.',
          },
          {
            type: 'paragraph',
            text: 'De persoonlijk begeleider bewaakt het begeleidingsproces, stelt samen met het team het begeleidingsplan op en zorgt voor de uitvoering en evaluatie ervan. Ook onderhoudt hij of zij contact met collega’s, familie en externe betrokkenen.',
          },
          {
            type: 'paragraph',
            text: 'Voor iedere deelnemer werken we met een begeleidingsplan. Hierin staan doelen, afspraken en aandachtspunten die richting geven aan de begeleiding. De plannen staan in ZilliZ.',
          },
          {
            type: 'bulletList',
            items: [
              'Begeleidingsplannen worden meestal twee keer per jaar geëvalueerd met alle betrokkenen.',
              'Bij de eindevaluatie is er altijd een persoonlijk gesprek met de deelnemer en/of betrokkenen.',
              'Bij jeugd is altijd een SKJ-geregistreerde professional eindverantwoordelijk voor het begeleidingsplan.',
            ],
          },
          {
            type: 'tip',
            label: '💡 Tip voor je eerste week',
            text: 'Lees in ZilliZ de begeleidingsplannen van de deelnemers met wie je werkt. Zo ken je hun doelen en afspraken.',
          },
        ],
      },
      {
        id: 'grenzen-en-veiligheid',
        title: 'Structuur, grenzen en veiligheid',
        summary: 'Warm in contact, maar altijd professioneel.',
        content: [
          {
            type: 'paragraph',
            text: 'In de begeleiding bieden we structuur, duidelijkheid en veiligheid. We zijn betrokken en warm in ons contact, maar blijven altijd professioneel.',
          },
          {
            type: 'paragraph',
            text: 'Persoonlijke en werkrelaties houden we gescheiden. Je bewaakt je rol als begeleider en de afstand in privésferen.',
          },
          {
            type: 'paragraph',
            text: 'Let op signalen van onveiligheid. Maak ze bespreekbaar en overleg zo nodig met collega’s of je leidinggevende.',
          },
          {
            type: 'highlight',
            text: 'De veiligheid van de deelnemer en de groep staat altijd voorop.',
          },
        ],
      },
      {
        id: 'rapporteren',
        title: 'Rapporteren',
        summary: 'Feitelijk, objectief, respectvol en op tijd.',
        content: [
          {
            type: 'paragraph',
            text: 'We rapporteren in ZilliZ. Zo blijft informatie actueel en compleet en kan het begeleidingsproces goed gevolgd worden.',
          },
          {
            type: 'numberedList',
            items: [
              'Rapporteer feitelijk, objectief, respectvol en op tijd.',
              'Beschrijf wat je daadwerkelijk hebt gezien, gehoord of gedaan. Vermijd aannames, interpretaties en oordelen.',
              'Rapporteer na iedere individuele begeleiding, of bij dagbesteding aan het einde van de dag.',
              'Bijzonderheden, incidenten en belangrijke veranderingen horen ook in de rapportage.',
            ],
          },
          {
            type: 'tip',
            label: '💡 Kort en doelgericht',
            text: 'Schrijf korte zinnen die gericht zijn op de doelen van de deelnemer, in plaats van een lang verhaal.',
          },
          {
            type: 'expandableAnswer',
            situation:
              'Je schrijft: “Hij had vandaag een slechte bui en had overal geen zin in.”',
            question: 'Is dit een feitelijke rapportage? Hoe kun je het beter opschrijven?',
            answerLabel: 'Bekijk een mogelijke richting',
            answer:
              '“Slechte bui” en “geen zin” zijn interpretaties. Beschrijf wat je zag en hoorde, bijvoorbeeld wat de deelnemer zei of deed en hoe jij daarop reageerde.',
          },
          {
            type: 'paragraph',
            text: 'Twijfel je wat je moet rapporteren? Bespreek het met de persoonlijk begeleider of een collega.',
          },
        ],
      },
      {
        id: 'professionele-houding',
        title: 'Professionele houding',
        summary: 'Respectvol met elkaar, zorgvuldig online.',
        content: [
          {
            type: 'paragraph',
            text: 'We gaan respectvol en prettig met elkaar om. We luisteren naar elkaar, spreken elkaar op een normale manier aan en helpen elkaar waar nodig.',
          },
          {
            type: 'paragraph',
            text: 'Discriminatie, intimidatie, agressie of ander ongewenst gedrag accepteren we niet. Als het toch voorkomt, spreken we elkaar erop aan en zoeken we samen naar een goede oplossing.',
          },
          {
            type: 'bulletList',
            items: [
              'Foto’s, informatie of situaties van deelnemers deel je nooit zonder toestemming.',
              'Online spreek je respectvol over de organisatie, collega’s en deelnemers.',
              'Wat we op de werkvloer doen, blijft binnen de werkcontext.',
              'Roken mag alleen op de aangewezen plekken.',
              'Alcohol of drugs tijdens werktijd zijn niet toegestaan, en je komt niet onder invloed op het werk.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'procedures',
    title: 'Systemen en afspraken',
    description: 'ZilliZ, protocollen, ziekmelden, verlof, kleding en telefoongebruik.',
    icon: 'list',
    duration: '10 minuten',
    completionMessage: {
      title: '🗂️ Helemaal wegwijs!',
      text: 'Je weet nu welke systemen we gebruiken en welke praktische afspraken er zijn.',
    },
    lessons: [
      {
        id: 'systemen',
        title: 'Onze systemen',
        summary: 'ZilliZ, SharePoint, Siilo en e-mail.',
        content: [
          {
            type: 'cards',
            items: [
              {
                title: 'ZilliZ',
                text: 'Ons cliëntenvolgsysteem: dossiers, rapportages, planning, je uren, verlof en via Intranet de protocollen.',
              },
              {
                title: 'SharePoint',
                text: 'Voor interne documenten, protocollen en werkinstructies.',
              },
              {
                title: 'Siilo',
                text: 'Voor professionele, veilige communicatie tussen collega’s over deelnemers.',
              },
              {
                title: 'E-mail (Outlook)',
                text: 'Alleen voor zakelijke communicatie. Stel je eigen handtekening in.',
              },
            ],
          },
          {
            type: 'highlight',
            text: 'Privacygevoelige informatie over deelnemers stuur je niet per gewone e-mail. Moet het toch gedeeld worden? Dan gaat het via ZilliZ.',
          },
          {
            type: 'paragraph',
            text: 'Let bij e-mail op zorgvuldig taalgebruik, de juiste ontvangers en het vermijden van onnodige of gevoelige informatie.',
          },
        ],
      },
      {
        id: 'protocollen',
        title: 'Protocollen en procedures',
        summary: 'Waar je ze vindt en wat er van je verwacht wordt.',
        content: [
          {
            type: 'paragraph',
            text: 'Protocollen en procedures helpen je om veilig, professioneel en eenduidig te werken.',
          },
          {
            type: 'paragraph',
            text: 'Je vindt ze in ZilliZ → Intranet. Als medewerker ben je zelf verantwoordelijk voor het kennen en volgen van de protocollen die voor jouw werk gelden.',
          },
          {
            type: 'numberedList',
            items: [
              'Lees de protocollen die voor jouw functie en werkzaamheden relevant zijn goed door.',
              'Twijfel je wat je moet doen? Kijk eerst in het protocol.',
              'Overleg daarna met je leidinggevende of een collega.',
            ],
          },
          {
            type: 'assignment',
            label: 'Praktijkopdracht',
            text: 'Log in op ZilliZ en zoek het onderdeel Intranet op. Welke protocollen zijn voor jouw werk belangrijk?',
            reflective: true,
          },
        ],
      },
      {
        id: 'rooster-ziek-verlof',
        title: 'Rooster, ziekmelden en verlof',
        summary: 'Wat je moet weten over je werktijden.',
        content: [
          {
            type: 'paragraph',
            text: 'We werken meestal overdag op doordeweekse dagen. We vragen je om op tijd aanwezig te zijn, zodat we de dag rustig kunnen starten.',
          },
          {
            type: 'bulletList',
            items: [
              'Houd je rooster goed in de gaten en geef bijzonderheden op tijd aan.',
              'Je gewerkte uren schrijf je in ZilliZ.',
              'Overwerk gebeurt altijd in overleg en alleen als het echt nodig is.',
              'Vakantie en ander verlof vraag je tijdig aan via ZilliZ. Hoe eerder, hoe beter we kunnen meedenken.',
            ],
          },
          {
            type: 'paragraph',
            text: 'Word je ziek? Meld je dan zo snel mogelijk en vóór de start van je dienst bij je leidinggevende. Geef kort door:',
          },
          {
            type: 'bulletList',
            items: [
              'hoe het met je gaat;',
              'hoe lang je verwacht afwezig te zijn;',
              'hoe je bereikbaar bent.',
            ],
          },
          {
            type: 'tip',
            label: '💡 Goed om te weten',
            text: 'Je hoeft geen medische details te delen. Houd tijdens je verzuim wel contact en geef het aan als je situatie verandert.',
          },
        ],
      },
      {
        id: 'kleding-en-telefoon',
        title: 'Werkkleding en telefoongebruik',
        summary: 'Praktische afspraken voor op het erf.',
        content: [
          {
            type: 'paragraph',
            text: 'Omdat we veel buiten en met dieren werken, krijg je naar rato van je gewerkte uren een kledingpakket van Stap voor Stap. Daarin zitten onder andere jassen, een bodywarmer, trui, vest, polo, T-shirt, pet en muts.',
          },
          {
            type: 'bulletList',
            items: [
              'Voor goed, stevig schoeisel en een passende werkbroek zorg je zelf.',
              'Houd je werkkleding schoon en netjes.',
              'Is kleding kapot of niet meer bruikbaar? Meld het bij je leidinggevende.',
            ],
          },
          {
            type: 'paragraph',
            text: 'Stap voor Stap heeft geen aparte werknummers. Je bepaalt zelf of je je privénummer met ouders of deelnemers deelt. Dat is niet verplicht.',
          },
          {
            type: 'bulletList',
            items: [
              'Deel je je nummer wel? Spreek dan duidelijk af wanneer en hoe er contact met je mag worden opgenomen.',
              'Je hoeft buiten je werktijd niet bereikbaar te zijn.',
              'Tijdens de begeleiding gebruik je je telefoon alleen als het nodig of passend is.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'jouw-functie',
    title: 'Jouw functie en groei',
    description: 'De functies binnen Stap voor Stap, arbeidsvoorwaarden en ontwikkeling.',
    icon: 'sprout',
    duration: '10 minuten',
    completionMessage: {
      title: '🌱 Ruimte om te groeien!',
      text: 'Je kent nu de functies binnen Stap voor Stap en de mogelijkheden om je te ontwikkelen.',
    },
    lessons: [
      {
        id: 'functies',
        title: 'De functies binnen Stap voor Stap',
        summary: 'Een duidelijke groeilijn.',
        content: [
          {
            type: 'paragraph',
            text: 'Binnen Stap voor Stap zijn er zes functies. Ze sluiten aan bij de CAO Sociaal Werk.',
          },
          {
            type: 'cards',
            items: [
              { title: 'Assistent Zorgboerderij 1', text: 'Assistent Welzijn · schaal 2' },
              { title: 'Assistent Zorgboerderij 2', text: 'Interne functie · schaal 3' },
              { title: 'Begeleider Zorgboerderij 1', text: 'Sociaal Werker 1 · schaal 5' },
              { title: 'Begeleider Zorgboerderij 2', text: 'Sociaal Werker 2 · schaal 6' },
              { title: 'Begeleider Zorgboerderij 3', text: 'Sociaal Werker 3 · schaal 7' },
              { title: 'Senior Begeleider Zorgboerderij', text: 'Sociaal Werker 4 · schaal 8' },
            ],
          },
          {
            type: 'paragraph',
            text: 'Iedere volgende functie bouwt voort op de kennis, ervaring en verantwoordelijkheden van de vorige. Ze lopen op in zelfstandigheid, vakkennis, ervaring en methodisch werken.',
          },
          {
            type: 'paragraph',
            text: 'Assistent Zorgboerderij 2 is een eigen functie van Stap voor Stap. Het is een ontwikkelstap tussen Assistent Welzijn en Sociaal Werker 1.',
          },
          {
            type: 'paragraph',
            text: 'Daarnaast werken er vrijwilligers en stagiaires mee.',
          },
          {
            type: 'tip',
            label: '💡 Meer lezen?',
            text: 'In het Functiehandboek staat per functie precies wat er van je verwacht wordt. Je vindt het in ZilliZ onder Intranet.',
          },
        ],
      },
      {
        id: 'verschillen-in-functies',
        title: 'Wat verschilt er per functie?',
        summary: 'Zelfstandigheid en verantwoordelijkheid.',
        content: [
          {
            type: 'cards',
            items: [
              {
                title: 'Assistent Zorgboerderij 1',
                text: 'Werkt onder directe aansturing. Verantwoordelijk voor de eigen werkzaamheden. Observeert en levert gevraagde input.',
              },
              {
                title: 'Assistent Zorgboerderij 2',
                text: 'Werkt onder directe aansturing, maar steeds zelfstandiger. Verantwoordelijk voor de uitvoering van activiteiten. Observeert, signaleert en rapporteert.',
              },
              {
                title: 'Begeleider Zorgboerderij 1',
                text: 'Zelfstandig binnen duidelijke instructies. Verantwoordelijk voor de uitvoering van begeleidingen. Schrijft doelrapportages.',
              },
              {
                title: 'Begeleider Zorgboerderij 2',
                text: 'Zelfstandig en organiseert het eigen werk. Heeft een eigen caseload. Schrijft zorgplannen en evaluaties.',
              },
              {
                title: 'Begeleider Zorgboerderij 3',
                text: 'Werkt zelfstandig in complexe situaties. Begeleidt complexe trajecten en coacht collega’s.',
              },
              {
                title: 'Senior Begeleider Zorgboerderij',
                text: 'Werkt zeer zelfstandig en bepaalt de aanpak. Kartrekker van kwaliteit en deskundigheidsbevordering.',
              },
            ],
          },
          {
            type: 'highlight',
            text: 'Een functie wordt niet alleen beoordeeld op opleidingsniveau, maar op de inhoud, zelfstandigheid en verantwoordelijkheden in de praktijk.',
          },
        ],
      },
      {
        id: 'arbeidsvoorwaarden',
        title: 'Arbeidsvoorwaarden',
        summary: 'Geregeld volgens de CAO Sociaal Werk.',
        content: [
          {
            type: 'paragraph',
            text: 'We werken volgens de CAO Sociaal Werk. Afspraken over salaris, werktijden, verlof en verzuim zijn daarmee goed geregeld.',
          },
          {
            type: 'bulletList',
            items: [
              'Je krijgt een schriftelijke arbeidsovereenkomst met je functie, salaris, arbeidsduur, proeftijd en contractduur.',
              'Heb je een 0-urencontract? Dan worden je gewerkte uren altijd één maand later uitbetaald.',
              'Je bouwt vanaf je eerste werkdag automatisch pensioen op.',
              'Reiskosten worden vergoed volgens de regeling in je arbeidsovereenkomst.',
            ],
          },
          {
            type: 'highlight',
            text: 'Iedere medewerker heeft geheimhoudingsplicht. Je tekent een geheimhoudingsovereenkomst die in je dossier komt.',
          },
        ],
      },
      {
        id: 'leren-en-ontwikkelen',
        title: 'Leren en ontwikkelen',
        summary: 'Inwerken, scholing en het jaarlijkse gesprek.',
        content: [
          {
            type: 'paragraph',
            text: 'Je start met een inwerkperiode. Je wordt begeleid door collega’s en krijgt de ruimte om vragen te stellen en mee te kijken voordat je zelfstandig taken oppakt.',
          },
          {
            type: 'bulletList',
            items: [
              'Waar nodig of verplicht volg je scholing, zoals BHV, meldcode en medicatieveiligheid.',
              'Maandelijks krijg je bij je loon het individueel keuzebudget, dat je kunt inzetten voor scholing en ontwikkeling.',
              'Daarnaast is er een studiebudget van €350 per jaar (op basis van fulltime). Voor SKJ-geregistreerden is dat €550 per jaar.',
              'Eén keer per jaar heb je een beoordelingsgesprek. Dat kan leiden tot een persoonlijk ontwikkelplan.',
            ],
          },
          {
            type: 'paragraph',
            text: 'Onze steunstructuur stimuleert je groei met deskundigheidsbevordering, intervisie, casuïstiek, teambuilding en het beoordelingsgesprek.',
          },
          {
            type: 'paragraph',
            text: 'Omdat we met jeugd werken, zijn er SKJ-geregistreerde Jeugd- en Gezinsprofessionals in dienst. Zij blijven zelf verantwoordelijk voor voldoende scholing voor hun herregistratie.',
          },
        ],
      },
      {
        id: 'stagiaires-vrijwilligers',
        title: 'Stagiaires en vrijwilligers',
        summary: 'Een waardevolle rol in het team.',
        content: [
          {
            type: 'paragraph',
            text: 'Vrijwilligers en stagiaires spelen een waardevolle rol in de dagelijkse begeleiding en activiteiten. Ze worden altijd ingewerkt en begeleid door een vaste medewerker.',
          },
          {
            type: 'bulletList',
            items: [
              'Sanne is stagecoördinator en het eerste aanspreekpunt voor stagezaken.',
              'Voor vrijwilligers en stagiaires is een geldige VOG verplicht. Zonder VOG kan iemand niet starten.',
              'Ook vrijwilligers en stagiaires hebben geheimhoudingsplicht, tijdens en na hun periode op de zorgboerderij.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'kennistoets',
    title: 'Kennistoets',
    description: 'Test je kennis van de belangrijkste afspraken.',
    icon: 'quiz',
    duration: '5 minuten',
    completionMessage: {
      title: '🎓 Toets afgerond!',
      text: 'Goed gedaan. Twijfel je nog ergens over? Kijk het na in de modules of vraag het een collega.',
    },
    lessons: [
      {
        id: 'toets-deel-1',
        title: 'Toets deel 1: begeleiden en veiligheid',
        summary: 'Vier vragen over begeleiden en veilig werken.',
        content: [
          {
            type: 'paragraph',
            text: 'Kies bij iedere vraag het antwoord dat volgens jou klopt. Je krijgt meteen te zien of het goed is.',
          },
          {
            type: 'quiz',
            question: 'Wanneer rapporteer je bij dagbesteding?',
            options: [
              'Eén keer per week',
              'Aan het einde van de dag',
              'Alleen als er iets bijzonders is gebeurd',
            ],
            correct: 1,
            explanation:
              'Bij dagbesteding rapporteer je aan het einde van de dag, en na iedere individuele begeleiding.',
          },
          {
            type: 'quiz',
            question: 'Je twijfelt of iets een incident was. Wat doe je?',
            options: [
              'Je meldt het altijd',
              'Je wacht af of het nog een keer gebeurt',
              'Je meldt het alleen als er iemand gewond is',
            ],
            correct: 0,
            explanation:
              'Twijfel je? Meld het dan altijd. Ook een bijna-incident meld je, in ZilliZ via het incidentmeldingsformulier.',
          },
          {
            type: 'quiz',
            question: 'Een deelnemer krijgt een epileptische aanval. Wat doe je als eerste?',
            options: [
              'De ouders bellen',
              'De tijd checken',
              'De deelnemer naar binnen brengen',
            ],
            correct: 1,
            explanation:
              'Je checkt als eerste de tijd. Daarna breng je andere deelnemers naar een veilige plek en bel je direct een collega.',
          },
          {
            type: 'quiz',
            question: 'Je maakt je zorgen over het welzijn van een deelnemer. Wat is de eerste stap?',
            options: [
              'Zelf uitzoeken wat er aan de hand is',
              'Het voor je houden tot je het zeker weet',
              'Je zorgen bespreken met je leidinggevende of een collega',
            ],
            correct: 2,
            explanation:
              'Je hoeft niet zelf te bepalen wat er aan de hand is. Bespreek je zorgen en volg de stappen uit de meldcode.',
          },
        ],
      },
      {
        id: 'toets-deel-2',
        title: 'Toets deel 2: de dag en afspraken',
        summary: 'Vier vragen over de dagstart en praktische afspraken.',
        content: [
          {
            type: 'quiz',
            question: 'Je hebt een dagelijkse klus op het digibord gedaan. Wat doe je?',
            options: [
              'De klus verwijderen van het bord',
              'Een vinkje zetten',
              'Niets, het bord past zich vanzelf aan',
            ],
            correct: 1,
            explanation:
              'Bij een dagelijkse klus zet je een vinkje; die verwijder je niet. Een incidentele klus verwijder je wel als hij klaar is.',
          },
          {
            type: 'quiz',
            question: 'Er speelt iets groots rond een deelnemer. Waar bespreken we dat?',
            options: [
              'Uitgebreid tijdens de dagstart',
              'In het maandelijkse DB-overleg',
              'Tijdens de pauze',
            ],
            correct: 1,
            explanation:
              'Tijdens de dagstart weiden we niet lang uit. Grote dingen gaan op de agenda van het maandelijkse DB-overleg.',
          },
          {
            type: 'quiz',
            question: 'Mag je privacygevoelige informatie over een deelnemer per gewone e-mail sturen?',
            options: [
              'Ja, als het naar een collega gaat',
              'Nee, dat gaat via ZilliZ',
              'Ja, als je het onderwerp duidelijk aangeeft',
            ],
            correct: 1,
            explanation:
              'Privacygevoelige informatie stuur je niet per gewone e-mail. Als het gedeeld moet worden, gaat het via ZilliZ.',
          },
          {
            type: 'quiz',
            question: 'Je bent ziek. Wanneer meld je je?',
            options: [
              'Zo snel mogelijk en vóór de start van je dienst',
              'Aan het einde van de dag',
              'De volgende werkdag',
            ],
            correct: 0,
            explanation:
              'Je meldt je zo snel mogelijk en vóór de start van je dienst bij je leidinggevende.',
          },
        ],
      },
    ],
  },
  {
    id: 'afronding',
    title: 'Afronding',
    description: 'Kijk terug op je onboarding en weet waar je alles terugvindt.',
    icon: 'check',
    duration: '3 minuten',
    completionMessage: {
      title: '🎉 Onboarding afgerond!',
      text: 'Zorgboerderij Stap voor Stap wenst jou super veel succes en plezier op onze boerderij!',
    },
    lessons: [
      {
        id: 'waar-vind-je-wat',
        title: 'Waar vind je wat?',
        summary: 'Een overzicht om op terug te vallen.',
        content: [
          {
            type: 'paragraph',
            text: 'Je hoeft niet alles te onthouden. Weet vooral waar je het kunt vinden:',
          },
          {
            type: 'cards',
            items: [
              { title: 'Protocollen en meldcodes', text: 'ZilliZ → Intranet → Protocollen' },
              { title: 'Functiehandboek', text: 'ZilliZ → Intranet' },
              { title: 'Rapportages, uren en verlof', text: 'ZilliZ' },
              { title: 'Klussenlijst', text: 'Geplastificeerd in de unit en in SharePoint' },
              { title: 'Klussen van vandaag', text: 'Het digibord' },
              { title: 'Alle afspraken', text: 'Het Handboek collega’s' },
            ],
          },
          {
            type: 'assignment',
            label: 'Terugblik',
            text: 'Wat neem je mee uit deze onboarding? En waar wil je nog meer over weten?',
            reflective: true,
          },
        ],
      },
      {
        id: 'tot-slot',
        title: 'Tot slot',
        summary: 'Ga ontdekken, ervaren en genieten.',
        content: [
          {
            type: 'image',
            src: '/fotos/Imara-geitjes.jpeg',
            alt: 'Imara met geitjes',
            size: 'wide',
          },
          {
            type: 'paragraph',
            text: 'We hopen dat je hier niet alleen anderen mag begeleiden in hun ontwikkeling, maar ook zelf mag groeien; als professional én als mens.',
          },
          {
            type: 'paragraph',
            text: 'Ga ontdekken, ervaren en genieten van alles wat Stap voor Stap te bieden heeft. We kijken ernaar uit om samen met jou aan de slag te gaan!',
          },
          {
            type: 'tip',
            label: '💡 Blijf vragen stellen',
            text: 'Heb je vragen of loop je ergens tegenaan? Weet je collega’s te vinden of loop even binnen op kantoor.',
          },
          {
            type: 'signoff',
            text: 'Anne en Bente',
          },
        ],
      },
    ],
  },
]

/**
 * Categorieën op het dashboard. Iedere module hoort bij één categorie;
 * de volgorde hier bepaalt de volgorde op het dashboard.
 */
export const categories = [
  {
    id: 'start',
    title: 'Welkom',
    moduleIds: ['welkom'],
    image: {
      src: '/fotos/welkom-geitjes.jpg',
      alt: 'Een collega op de picknicktafel tussen de jonge geitjes',
    },
  },
  {
    id: 'organisatie',
    title: 'Onze organisatie',
    description: 'Onze visie, de mensen en de zorgboerderij.',
    moduleIds: ['onze-visie', 'organisatie', 'zorgboerderij'],
  },
  {
    id: 'de-dag',
    title: 'De dag op de boerderij',
    description: 'Het digibord, de dagstart, de klusjes en de dieren.',
    moduleIds: ['digibord', 'dagstart-digibord', 'klusjes-dagprogramma', 'paarden-dieren'],
  },
  {
    id: 'werken',
    title: 'Goed en veilig werken',
    description: 'Veiligheid, begeleiden en de afspraken die we maken.',
    moduleIds: ['veilig-werken', 'deelnemers-begeleiden', 'procedures'],
  },
  {
    id: 'afronden',
    title: 'Jij bij Stap voor Stap',
    description: 'Jouw functie, de kennistoets en de afronding.',
    moduleIds: ['jouw-functie', 'kennistoets', 'afronding'],
  },
]

export function getCategoriesWithModules() {
  return categories.map((category) => ({
    ...category,
    modules: category.moduleIds.map(getModuleById).filter(Boolean),
  }))
}

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
