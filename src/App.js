import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Detail from './Detail/';
import List from './List';
import {
  PEOPLE,
  PLANETS,
  SPECIES,
  STARSHIPS,
  VEHICLES,
  FILMS,
} from './constants';

const App = () => {
  return (
    <div className="container">
      <div className="header">
        <h1>Star Wars</h1>
        <div className="links">
          <Link to={`/${PEOPLE}`}>People</Link>
          <Link to={`/${PLANETS}`}>Planets</Link>
          <Link to={`/${VEHICLES}`}>Vehicles</Link>
          <Link to={`/${STARSHIPS}`}>Starships</Link>
          <Link to={`/${SPECIES}`}>Species</Link>
          <Link to={`/${FILMS}`}>Films</Link>
        </div>
      </div>
      <Switch>
        <Route path="/:type">
          <List />
        </Route>
        <Route path="/">
          <List />
        </Route>
      </Switch>
      <div className="content">
        <Switch>
          <Route path="/:type/:id">
            <Detail />
          </Route>
          <Route path="/">Welcome</Route>
        </Switch>
      </div>
    </div>
  );
};

export default App;
