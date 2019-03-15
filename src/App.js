import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import Landing from './containers/Landing';
import NavBar from './containers/NavBar';
import Board from './containers/Board';

import './App.css';
import 'antd/dist/antd.min.css';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  position: relative;
`;

const App = (props) => (
  <Router>
    <AppContainer>
      <NavBar />
      <ContentContainer>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route path='/board/:id' component={Board} />
        </Switch>
      </ContentContainer>
    </AppContainer>
  </Router>
);

export default App;