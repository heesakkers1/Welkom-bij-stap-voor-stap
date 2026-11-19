/**
 * Foto's die net via de bewerkpagina zijn geüpload, staan pas op de site na
 * de volgende bouw van Vercel. Tot die tijd tonen we in de bewerkpagina de
 * foto uit het geheugen van de browser.
 */
const previews = new Map()

export function registerPreview(src, dataUrl) {
  previews.set(src, dataUrl)
}

export function previewSrc(src) {
  return previews.get(src) ?? src
}
