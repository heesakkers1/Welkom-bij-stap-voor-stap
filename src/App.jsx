import { useState } from 'react'
import { modules } from './data/modules'
import Dashboard from './pages/Dashboard'
import ModulePlaceholder from './pages/ModulePlaceholder'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [activeModuleId, setActiveModuleId] = useState(null)

  const activeModule = modules.find((module) => module.id === activeModuleId)

  function goToDashboard() {
    setCurrentView('dashboard')
    setActiveModuleId(null)
  }

  function openModule(moduleId) {
    setActiveModuleId(moduleId)
    setCurrentView('module')
  }

  function startOnboarding() {
    const firstModule = modules[0]
    if (firstModule) {
      openModule(firstModule.id)
    }
  }

  if (currentView === 'module') {
    return (
      <div className="app">
        <ModulePlaceholder module={activeModule} onBack={goToDashboard} />
      </div>
    )
  }

  return (
    <div className="app">
      <Dashboard onStart={startOnboarding} onSelectModule={openModule} />
    </div>
  )
}

export default App
