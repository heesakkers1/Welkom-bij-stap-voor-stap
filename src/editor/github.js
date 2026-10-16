/**
 * Opslaan van teksten via GitHub.
 * De bewerkpagina leest en schrijft src/data/content.json in de repository.
 * Na elke opslag bouwt Vercel de site automatisch opnieuw.
 */
export const REPO_OWNER = 'heesakkers1'
export const REPO_NAME = 'Welkom-bij-stap-voor-stap'
export const CONTENT_PATH = 'src/data/content.json'

const TOKEN_KEY = 'stap-voor-stap-bewerksleutel'
const API = 'https://api.github.com'

export const TOKEN_URL =
  'https://github.com/settings/personal-access-tokens/new?' +
  new URLSearchParams({
    name: 'Bewerkmodus onboardingsite',
    description: 'Teksten aanpassen via /bewerken op de onboardingsite',
    target_name: REPO_OWNER,
    expires_in: '365',
    contents: 'write',
  }).toString()

export function getStoredToken() {
  try {
    return localStorage.getItem(TOKEN_KEY) ?? ''
  } catch {
    return ''
  }
}

export function storeToken(token) {
  try {
    localStorage.setItem(TOKEN_KEY, token)
  } catch {
    // Opslaan in de browser lukt niet; de sleutel werkt dan alleen deze sessie.
  }
}

export function clearToken() {
  try {
    localStorage.removeItem(TOKEN_KEY)
  } catch {
    // niets te doen
  }
}

export class GitHubError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

async function request(token, path, options = {}) {
  let response
  try {
    response = await fetch(`${API}${path}`, {
      ...options,
      cache: 'no-store',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'X-GitHub-Api-Version': '2022-11-28',
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      },
    })
  } catch {
    throw new GitHubError(
      'Er is geen verbinding met GitHub. Controleer je internet en probeer het opnieuw.',
      0,
    )
  }

  if (response.status === 401) {
    throw new GitHubError(
      'Deze sleutel werkt niet (meer). Maak een nieuwe sleutel aan en plak die hier.',
      401,
    )
  }
  if (response.status === 403 || response.status === 404) {
    throw new GitHubError(
      'Deze sleutel heeft geen toegang tot de site. Kies bij het aanmaken de repository "Welkom-bij-stap-voor-stap" en zet "Contents" op "Read and write".',
      response.status,
    )
  }
  if (response.status === 409) {
    throw new GitHubError(
      'De teksten zijn intussen ergens anders aangepast. Kopieer je laatste wijziging, herlaad de pagina en probeer het opnieuw.',
      409,
    )
  }
  if (!response.ok) {
    throw new GitHubError(
      `GitHub gaf een fout (${response.status}). Probeer het over een paar minuten opnieuw.`,
      response.status,
    )
  }

  return response.json()
}

function decodeBase64(text) {
  const binary = atob(text.replace(/\n/g, ''))
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

function encodeBase64(text) {
  const bytes = new TextEncoder().encode(text)
  let binary = ''
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000))
  }
  return btoa(binary)
}

/** Controleert de sleutel en zoekt uit naar welke branch we schrijven. */
export async function connect(token) {
  const repo = await request(token, `/repos/${REPO_OWNER}/${REPO_NAME}`)
  if (!repo.permissions?.push) {
    throw new GitHubError(
      'Deze sleutel mag alleen lezen. Zet bij het aanmaken "Contents" op "Read and write".',
      403,
    )
  }
  // Op een Vercel-voorbeeldversie schrijven we naar de branch van die versie.
  return import.meta.env.VITE_VERCEL_GIT_COMMIT_REF || repo.default_branch
}

export async function loadContent(token, branch) {
  const file = await request(
    token,
    `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${CONTENT_PATH}?ref=${encodeURIComponent(branch)}`,
  )
  return { content: JSON.parse(decodeBase64(file.content)), sha: file.sha }
}

export async function saveContent(token, branch, content, sha, message) {
  const result = await request(
    token,
    `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${CONTENT_PATH}`,
    {
      method: 'PUT',
      body: JSON.stringify({
        message,
        content: encodeBase64(`${JSON.stringify(content, null, 2)}\n`),
        sha,
        branch,
      }),
    },
  )
  return result.content.sha
}
