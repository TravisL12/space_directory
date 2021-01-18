import React, { useEffect, useState } from 'react';
import './App.css';
import Detail from './Detail';
import List from './List';
import { fetchPeople } from './helper';

const App = () => {
  const [people, setPeople] = useState([]);
  const [id, setId] = useState(null);

  const getData = async () => {
    try {
      const people = await fetchPeople();
      setPeople(people);
    } catch (err) {
      console.error('There was a problem fetching people:', err);
    }
  };

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      const id = window.location.hash.slice(1) * 1;
      setId(id);
    });
    if (window.location.hash.length > 1) {
      const id = window.location.hash.slice(1) * 1;
      setId(id);
    }
    getData();
  }, []);

  const person = people.find((person) => person.id === id);

  return (
    <div className="container">
      <div className="header">
        <h1>Star Wars</h1>
      </div>
      <div className="sidebar">
        <List people={people} />
      </div>
      <div className="content">{person && <Detail person={person} />}</div>
    </div>
  );
};

export default App;
