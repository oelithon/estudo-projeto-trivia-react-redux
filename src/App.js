import React from 'react';
import { Switch, Route, BrowserRouter, Router } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import ButtonSettings from './pages/Settings';
import history from './history';
import Score from './pages/Score';

export default function App() {
  return (
    <BrowserRouter>
      <Router history={ history }>
        <Switch>
          <Route path="/score" component={ Score } />
          <Route path="/settings" component={ ButtonSettings } />
          <Route path="/game" component={ Game } />
          <Route exact path="/" component={ Login } />
        </Switch>
      </Router>
    </BrowserRouter>
  );
}
