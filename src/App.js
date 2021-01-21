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
import { SW_API_URL, fetchStarWars } from './helper';

const App = () => {
  const [people, setPeople] = useState();

  const getData = async () => {
    try {
      const data = await fetchStarWars(`${SW_API_URL}/people`);
      const characters = data.results.map((person, idx) => {
        person.id = idx + 1;
        return person;
      });
      setPeople(characters);
    } catch (err) {
      console.error('There was a problem fetching people:', err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (!people) {
    return <div>loading</div>;
  }

  return (
    <Router>
      <div className="container">
        <div className="header">
          <h1>Star Wars</h1>
        </div>
        <div className="sidebar">
          <List people={people} />
        </div>
        <div className="content">
          <Switch>
            <Route
              path="/person/:id"
              render={(params) => {
                const id = params.match.params.id;
                const character = people.find((person) => +person.id === +id);
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
