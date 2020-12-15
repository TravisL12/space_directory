import React from 'react';
import './App.css';
import axios from 'axios';
import Detail from './Detail';
import List from './List';

const domain = 'https://swapi.dev/api/people/';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      people: [],
      id: null,
    };
  }
  async componentDidMount() {
    window.addEventListener('hashchange', () => {
      const id = window.location.hash.slice(1) * 1;
      this.setState({ id });
    });
    if (window.location.hash.length > 1) {
      const id = window.location.hash.slice(1) * 1;
      this.setState({ id });
    }
    try {
      const res = await axios.get(`${domain}`);
      const res2 = await axios.get(`${domain}?page=2`);
      const resultsAll = [];
      resultsAll.push(res.data.results);
      resultsAll.push(res2.data.results);
      const starwars = resultsAll.flat();

      const people = [];
      for (let i = 0; i < starwars.length; i++) {
        people[i] = starwars[i];
        people[i].id = i + 1;
      }
      this.setState({ people });
    } catch (err) {
      console.error('There was a problem fetching people:', err);
    }
  }
  render() {
    const { people, id } = this.state;
    const person = people.find((person) => person.id === id);
    return (
      <div>
        <h1>Star Wars - React</h1>
        <div id="content">
          <List people={people} />
          {person ? <Detail person={person} /> : null}
        </div>
      </div>
    );
  }
}

export default App;
