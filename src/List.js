import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

export default function List({ people, getCharacters }) {
  return (
    <div className="sidebar">
      <div>
        <button
          disabled={!people.more}
          onClick={() => getCharacters(people.more)}
        >
          Next
        </button>
      </div>
      <div id="content">
        <ul>
          {people.people.map((person) => {
            return (
              <li id="namelistli">
                <Link id="namelist" key={person.id} to={`/person/${person.id}`}>
                  {person.id}. {person.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
