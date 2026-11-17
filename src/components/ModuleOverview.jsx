import { Navigate, useParams } from 'react-router-dom'
import { getModuleById, isModuleAvailable } from '../data/modules'
import { useProgress } from '../context/ProgressContext'

/**
 * Een module heeft geen aparte tussenpagina meer: je gaat meteen naar de
 * eerste stap die je nog niet hebt afgerond (of naar stap 1). Alle stappen
 * staan bovenaan elke stap in de stappenbalk.
 */
function ModuleOverview() {
  const { moduleId } = useParams()
  const module = getModuleById(moduleId)
  const { isLessonCompleted } = useProgress()

  if (!module || !isModuleAvailable(module)) {
    return <Navigate to="/" replace />
  }

  const lesson =
    module.lessons.find((item) => !isLessonCompleted(module.id, item.id)) ??
    module.lessons[0]

  return <Navigate to={`/module/${module.id}/les/${lesson.id}`} replace />
}

export default ModuleOverview
