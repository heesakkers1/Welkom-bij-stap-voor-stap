/**
 * Opslaan van teksten via GitHub.
 * De bewerkpagina leest en schrijft src/data/content.json in de repository.
 * Na elke opslag bouwt Vercel de site automatisch opnieuw.
 */
export const REPO_OWNER = 'heesakkers1'
export const REPO_NAME = 'Welkom-bij-stap-voor-stap'
export const CONTENT_PATH = 'src/data/content.json'
export const LIVE_BRANCH = 'main'

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
  // De live site draait op 'main'. Op een Vercel-proefversie schrijven we
  // naar de branch van die proefversie.
  return import.meta.env.VITE_VERCEL_GIT_COMMIT_REF || LIVE_BRANCH
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

/** Maakt een eenvoudige bestandsnaam van een titel, zoals "erf-t-kot". */
function slugify(text) {
  return (
    text
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'foto'
  )
}

/** Verkleint een foto in de browser tot een JPEG van hooguit `maxSize` pixels breed of hoog. */
export function shrinkImage(file, maxSize = 1400) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const image = new Image()
    image.onload = () => {
      const scale = Math.min(1, maxSize / Math.max(image.width, image.height))
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(image.width * scale)
      canvas.height = Math.round(image.height * scale)
      canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height)
      URL.revokeObjectURL(url)
      resolve(canvas.toDataURL('image/jpeg', 0.82))
    }
    image.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new GitHubError('Deze foto kan niet worden geopend. Probeer een JPG- of PNG-foto.', 0))
    }
    image.src = url
  })
}

/**
 * Zet een foto in public/fotos/ op GitHub en geeft het pad terug dat de site
 * gebruikt (bijv. "/fotos/erf-moestuin-1700000000000.jpg").
 */
export async function uploadImage(token, branch, dataUrl, nameHint) {
  const fileName = `${slugify(nameHint)}-${Date.now()}.jpg`
  await request(token, `/repos/${REPO_OWNER}/${REPO_NAME}/contents/public/fotos/${fileName}`, {
    method: 'PUT',
    body: JSON.stringify({
      message: `Foto toegevoegd via de bewerkpagina: ${fileName}`,
      content: dataUrl.split(',')[1],
      branch,
    }),
  })
  return `/fotos/${fileName}`
}
