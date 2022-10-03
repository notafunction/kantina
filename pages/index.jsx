import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from '../src/components/Navbar/NavBar'
import RequireAccess from '../src/containers/RequireAccess'
import { useGoogleAnalytics } from '../src/hooks'
import '../src/App.css'

const Dashboard = React.lazy(() => import('../src/containers/Dashboard/Dashboard'))
const Board = React.lazy(() => import('../src/containers/Board/Board'))

const App = () => {
  useGoogleAnalytics()

  return (
    <div className="flex flex-col h-full">
      <NavBar />
      <div className="px-4 flex-1 flex relative">
        {/* <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/b/:boardId"
            element={
              <RequireAccess>
                <Board />
              </RequireAccess>
            }
          />
        </Routes> */}
      </div>
    </div>
  )
}

export default App
