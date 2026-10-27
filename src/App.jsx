import { lazy, Suspense } from 'react'
import { Navigate, Routes, Route, useLocation } from 'react-router-dom'
import { ProgressProvider, useProgress } from './context/ProgressContext'
import WelcomeScreen from './pages/WelcomeScreen'
import Dashboard from './pages/Dashboard'
import ModuleOverview from './components/ModuleOverview'
import LessonPage from './components/LessonPage'
import AskQuestion from './components/AskQuestion'
import DierenkaartPage from './pages/DierenkaartPage'
import './App.css'

const EditorPage = lazy(() => import('./pages/EditorPage'))

function RequireWelcome({ children }) {
  const { welcomeSeen } = useProgress()

  if (!welcomeSeen) {
    return <Navigate to="/intro" replace />
  }

  return children
}

function App() {
  const { pathname } = useLocation()
  const editing = pathname.startsWith('/bewerken')
  const standalone = pathname.startsWith('/dierenkaart')

  return (
    <ProgressProvider>
      <div className="app">
        <Routes>
          <Route path="/intro" element={<WelcomeScreen />} />
          <Route path="/dierenkaart" element={<DierenkaartPage />} />
          <Route
            path="/bewerken"
            element={
              <Suspense fallback={null}>
                <EditorPage />
              </Suspense>
            }
          />
          <Route
            path="/"
            element={
              <RequireWelcome>
                <Dashboard />
              </RequireWelcome>
            }
          />
          <Route
            path="/module/:moduleId"
            element={
              <RequireWelcome>
                <ModuleOverview />
              </RequireWelcome>
            }
          />
          <Route
            path="/module/:moduleId/les/:lessonId"
            element={
              <RequireWelcome>
                <LessonPage />
              </RequireWelcome>
            }
          />
        </Routes>
        {editing || standalone ? null : <AskQuestion />}
      </div>
    </ProgressProvider>
  )
}

export default App
