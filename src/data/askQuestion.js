/**
 * Inhoud van de knop "Vraag stellen".
 * Vragen komen binnen bij planning, waar de leidinggevende en de
 * coördinatoren ze lezen (keuze van Anne, 15-10-2026).
 *
 * `formKey` is de toegangssleutel van Web3Forms (gekoppeld aan planning@).
 * Zolang die leeg is, opent het formulier de mailapp met de vraag erin.
 */
export const askQuestion = {
  email: 'planning@zorgboerderijstapvoorstap.nl',
  subject: 'Vraag vanuit de onboarding',
  formKey: '',
  formEndpoint: 'https://api.web3forms.com/submit',
}
