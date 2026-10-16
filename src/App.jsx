import { Navigate, Routes, Route } from 'react-router-dom'
import { ProgressProvider, useProgress } from './context/ProgressContext'
import WelcomeScreen from './pages/WelcomeScreen'
import Dashboard from './pages/Dashboard'
import Voorbereiding from './pages/Voorbereiding'
import ModuleOverview from './components/ModuleOverview'
import LessonPage from './components/LessonPage'
import AskQuestion from './components/AskQuestion'
import './App.css'

function RequireWelcome({ children }) {
  const { welcomeSeen } = useProgress()

  if (!welcomeSeen) {
    return <Navigate to="/intro" replace />
  }

  return children
}

function App() {
  return (
    <ProgressProvider>
      <div className="app">
        <Routes>
          <Route path="/intro" element={<WelcomeScreen />} />
          {/* Voor de begeleiders: alleen via de link, niet in het menu. */}
          <Route path="/voorbereiding" element={<Voorbereiding />} />
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
        <AskQuestion />
      </div>
    </ProgressProvider>
  )
}

export default App
