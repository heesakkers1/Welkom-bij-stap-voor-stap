/**
 * Inhoud van de knop "Vraag stellen".
 * Vragen komen binnen bij planning, waar de leidinggevende en de
 * coördinatoren ze lezen (keuze van Anne, 15-10-2026).
 *
 * `formKey` is de toegangssleutel van Web3Forms (gekoppeld aan planning@).
 * Deze sleutel is bedoeld om openbaar in de site te staan. Zonder sleutel
 * opent het formulier de mailapp met de vraag erin.
 */
export const askQuestion = {
  email: 'planning@zorgboerderijstapvoorstap.nl',
  subject: 'Vraag vanuit de onboarding',
  formKey: '7c99f4ec-38ed-4a19-ae86-7bc928050782',
  formEndpoint: 'https://api.web3forms.com/submit',
}
