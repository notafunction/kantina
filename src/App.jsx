import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Board from './containers/Board/Board'
import NavBar from './components/Navbar/NavBar'
import RequireAccess from './containers/RequireAccess'
import { useGoogleAnalytics } from './hooks'
import './App.css'
import Dashboard from './containers/Dashboard/Dashboard'

const App = () => {
  useGoogleAnalytics()

  return (
    <div className="flex flex-col h-full">
      <NavBar />
      <div className="px-4 flex-1 relative">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/b/:boardId"
            element={
              <RequireAccess>
                <Board />
              </RequireAccess>
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
