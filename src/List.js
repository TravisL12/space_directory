import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

export default function List({ people }) {
  return (
    <div id="content">
      <ul>
        {people.map((person) => {
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
  );
}
