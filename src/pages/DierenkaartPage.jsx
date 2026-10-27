import { getLessonById } from '../data/modules'
import LessonContent from '../components/LessonContent'
import '../components/LessonPage.css'

/**
 * Losse, deelbare pagina /dierenkaart. Toont dezelfde tekst als de stap
 * "Maak kennis met de paarden", dus aanpassen gaat via de bewerkpagina.
 */
function DierenkaartPage() {
  const result = getLessonById('paarden-dieren', 'maak-kennis-met-de-paarden')
  const blocks = (result?.lesson.content ?? []).filter(
    (block) => !(block.type === 'document' && block.href === '/dierenkaart'),
  )

  return (
    <main className="lesson-page">
      <header className="app-header">
        <p className="lesson-page__meta">Zorgboerderij Stap voor Stap</p>
        <h1 className="app-header__title">
          {result ? `🐴 ${result.lesson.title}` : 'Dierenkaart'}
        </h1>
      </header>
      <LessonContent blocks={blocks} lessonId="dierenkaart" />
    </main>
  )
}

export default DierenkaartPage
