import { Navigate, Routes, Route } from 'react-router-dom'
import { ProgressProvider, useProgress } from './context/ProgressContext'
import WelcomeScreen from './pages/WelcomeScreen'
import Dashboard from './pages/Dashboard'
import ModuleOverview from './components/ModuleOverview'
import LessonPage from './components/LessonPage'
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
      </div>
    </ProgressProvider>
  )
}

export default App
