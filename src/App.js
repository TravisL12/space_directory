import React, { useEffect, useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Detail from './Detail/';
import List from './List';
import { SW_API_URL, fetchStarWars, getIdFromUrl } from './helper';
import { PEOPLE, PLANETS, VEHICLES } from './constants';

const App = () => {
  const [people, setPeople] = useState({ people: [] });
  const getCharacters = async (url) => {
    try {
      const { next, results } = await fetchStarWars(url);
      const newPeople = results.map((person) => {
        person.id = getIdFromUrl(person.url);
        return person;
      });
      setPeople({ more: next, people: [...people.people, ...newPeople] });
    } catch (err) {
      console.error('There was a problem fetching people:', err);
    }
  };

  useEffect(() => {
    getCharacters(`${SW_API_URL}/people`);
  }, []);

  if (people.people.length === 0) {
    return <div>loading</div>;
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Star Wars</h1>
        <div>
          <Link to={`/${PEOPLE}`}>People</Link>
          <Link to={`/${PLANETS}`}>Planets</Link>
          <Link to={`/${VEHICLES}`}>Vehicles</Link>
        </div>
      </div>
      <Switch>
        <Route path="/:type">
          <List people={people} getCharacters={getCharacters} />
        </Route>
        <Route path="/">
          <List people={{ people: [] }} />
        </Route>
      </Switch>
      <div className="content">
        <Switch>
          <Route path="/:type/:id">
            <Detail people={people} />
          </Route>
          <Route path="/">Welcome</Route>
        </Switch>
      </div>
    </div>
  );
};

export default App;
