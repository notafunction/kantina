import React from 'react'
import { Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import Boards from './containers/Boards'
import Board from './containers/Board'
import NavBar from './components/Navbar/NavBar'
import RequireAccess from './containers/RequireAccess'
import { useGoogleAnalytics } from './hooks'
import './App.css'

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const ContentContainer = styled.div`
  flex-grow: 1;
  position: relative;
`

const App = () => {
  useGoogleAnalytics()

  return (
    <AppContainer>
      <NavBar />
      <ContentContainer>
        <Routes>
          <Route path="/" element={<Boards />} />
          <Route
            path="/b/:boardId"
            element={
              <RequireAccess>
                <Board />
              </RequireAccess>
            }
          />
        </Routes>
      </ContentContainer>
    </AppContainer>
  )
}

export default App
