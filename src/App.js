import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './App.css';
import Detail from './Detail/';
import List from './List';
import { SW_API_URL, fetchStarWars, getIdFromUrl } from './helper';

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
    <Router>
      <div className="container">
        <div className="header">
          <h1>Star Wars</h1>
        </div>
        <List people={people} getCharacters={getCharacters} />
        <div className="content">
          <Switch>
            <Route
              path="/person/:id"
              render={(params) => {
                const id = params.match.params.id;
                const character = people.people.find(
                  (person) => +person.id === +id
                );
                return character ? (
                  <Detail person={character} />
                ) : (
                  <Redirect to="/" />
                );
              }}
            />

            <Route path="/">Welcome</Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
