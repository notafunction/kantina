import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavBar from './containers/NavBar';
import Landing from './containers/Landing';
import Settings from './containers/Settings';
import Profile from './containers/Profile';
import Board from './containers/Board';

import { Box } from 'gestalt';

import './App.css';
import 'gestalt/dist/gestalt.css';

const App = (props) => (
  <Router>
    <Box display="flex" direction="column" height="100%" padding={2}>
      <NavBar />
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/settings' component={Settings} />
        <Route path='/profile/:uid' component={Profile} />
        <Route path='/board/:id' component={Board} />
      </Switch>
    </Box>
  </Router>
);

export default App;