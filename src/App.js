import React from 'react';
import './App.css';
import axios from 'axios';

const domain = 'https://swapi.dev/api/people/';
const List = ({ people }) => {
  return (
    <div id="content">
      <ul>
        {people.map((person) => {
          return (
            <a id="namelist" key={person.id} href={`#${person.id}`}>
              <li id="namelistli" key={person.id}>
                {person.name}
              </li>
            </a>
          );
        })}
      </ul>
    </div>
  );
};
const Detail = ({ person, select }) => {
  const data = [],
    dataInfo = [];
  for (let key in person) {
    if (key === 'name') {
      data.push(key);
      dataInfo.push(person[key]);
    }
    if (key === 'height') {
      data[2] = key;
      dataInfo[2] = person[key];
    }
    if (key === 'hair_color') {
      data[1] = key;
      dataInfo[1] = person[key];
    }
    if (key === 'eye_color' || key === 'birth_year' || key === 'homeworld') {
      data.push(key);
      dataInfo.push(person[key]);
    }
  }
  function hideDetails() {
    window.location = '#';
  }
  return (
    <div>
      <br />
      <button id="hideDetails" onClick={hideDetails}>
        <img src="storm.jfif" alt="stormtrooper" /> Hide Details
      </button>
      <h2>Details for {`${person.name}`}</h2>
      <div id="content">
        <ul>
          {data.map((value, index) => {
            return (
              <li id="traits" key={index}>
                {value}
              </li>
            );
          })}
        </ul>
        <ul>
          {dataInfo.map((value, index) => {
            if (value[5] === ':')
              return (
                <a href={value} key={index}>
                  <li id="liurl" key={index}>
                    {value}
                  </li>
                </a>
              );
            return (
              <li key={index}>
                {value.startsWith('http') ? (
                  <a
                    href={value}
                    key={index}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {value}
                  </a>
                ) : (
                  value
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

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
      const starwars = res.data;
      const people = [];
      for (let i = 0; i < starwars.results.length; i++) {
        people[i] = starwars.results[i];
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
        <h1>Star Wars - React Style</h1>
        <div id="content">
          <List people={people} />
          <div id="other" />
          {person ? <Detail person={person} /> : null}
        </div>
      </div>
    );
  }
}

export default App;
