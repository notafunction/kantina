import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import Landing from './containers/Landing';
import NavBar from './containers/NavBar';
import Board from './containers/Board';
import Settings from './containers/Settings';

import './App.css';
import 'gestalt/dist/gestalt.css';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const App = (props) => (
  <Router>
    <AppContainer>
      <NavBar />
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/settings' component={Settings} />
        <Route path='/board/:id' component={Board} />
      </Switch>
    </AppContainer>
  </Router>
);

export default App;