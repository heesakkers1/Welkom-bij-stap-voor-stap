/**
 * Checklist "Voorbereiding nieuwe collega": wat er vóór de eerste werkdag
 * geregeld moet zijn, en wie dat doet. Dit is voor de begeleiders en staat
 * daarom los van de onboardingsite, op een eigen link.
 *
 * Bronnen: Onboardingplan Stap voor Stap (fase 1 en checklist
 * leidinggevende), Onboarding voor collega's 2026 (preboarding, 30 tot
 * 0 dagen voor de start), Kwaliteitshandboek (e-mail, kleding, ZilliZ via
 * de backoffice, SharePoint, postvakje), Handboek collega's (kledingpakket
 * naar rato van de uren). Jaap regelt de accounts (Anne, 16-10-2026).
 */
export const voorbereidingFields = [
  { id: 'naam', label: 'Naam nieuwe collega', type: 'text' },
  { id: 'functie', label: 'Functie', type: 'text' },
  { id: 'start', label: 'Startdatum', type: 'date' },
  { id: 'uren', label: 'Uren per week', type: 'number' },
  { id: 'aanspreekpunt', label: 'Vast aanspreekpunt (coördinator)', type: 'text' },
  { id: 'leidinggevende', label: 'Leidinggevende', type: 'text' },
]

export const voorbereidingGroups = [
  {
    id: 'leidinggevende',
    who: 'Leidinggevende',
    items: [
      { id: 'contract', text: 'Arbeidscontract en personeelsgegevens regelen, eventueel met de administratie' },
      { id: 'vog', text: 'VOG en eisen voor de functie controleren; diploma’s en VOG laten aanleveren bij de backoffice' },
      { id: 'aanspreekpunt', text: 'Een van de coördinatoren koppelen als vast aanspreekpunt en hem of haar op de hoogte brengen' },
      { id: 'welkom', text: 'Welkomstbericht sturen met starttijd, kleding, het vaste aanspreekpunt en de link naar de onboarding' },
      { id: 'programma', text: 'Programma eerste werkdag en eerste week afstemmen met het vaste aanspreekpunt: persoonlijk welkom, rondleiding en kennismaking met het team' },
      { id: 'team', text: 'Het team laten weten wie er komt en wanneer' },
      { id: 'evaluaties', text: 'Evaluatiegesprekken op dag 30, 60, 90 en 100 inplannen' },
    ],
  },
  {
    id: 'backoffice',
    who: 'Backoffice (Jaap)',
    askName: 'Jaap',
    askTask: () => 'het e-mailadres, het ZilliZ-account en de toegang tot SharePoint regelen',
    items: [
      { id: 'zilliz', text: 'Account op ZilliZ aanmaken' },
      { id: 'mail', text: 'Eigen e-mailadres aanmaken' },
      { id: 'sharepoint', text: 'Toegang tot SharePoint regelen' },
    ],
  },
  {
    id: 'praktisch',
    who: 'Verantwoordelijke collega',
    askName: '',
    askTask: ({ uren }) =>
      `het kledingpakket${uren ? ` (voor ${uren} uur per week)` : ''} en een postvakje en vakje voor de tas klaarzetten`,
    items: [
      { id: 'kleding', text: 'Kledingpakket klaarleggen, passend bij het aantal uren' },
      { id: 'postvak', text: 'Postvakje en vakje voor de tas in de personeelsruimte regelen' },
    ],
  },
]

export const voorbereidingItemIds = voorbereidingGroups.flatMap((group) =>
  group.items.map((item) => item.id),
)
