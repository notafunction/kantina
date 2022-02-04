import React from 'react'
import { Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import Boards from './containers/Boards'
import Board from './containers/Board'
import NavBar from './components/Navbar/NavBar'
import ChangeLog from './containers/ChangeLog'
import './App.css'
import RequireAccess from './containers/RequireAccess'

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const ContentContainer = styled.div`
  flex-grow: 1;
  position: relative;
`

const App = () => (
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
        <Route path="/changelog" element={<ChangeLog />} />
      </Routes>
    </ContentContainer>
  </AppContainer>
)

export default App
