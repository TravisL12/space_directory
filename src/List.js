import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { PEOPLE } from './constants';

export default function List({ people, getCharacters }) {
  return (
    <div className="sidebar">
      <div>
        {getCharacters && (
          <button
            disabled={!people.more}
            onClick={() => getCharacters(people.more)}
          >
            Next
          </button>
        )}
      </div>
      <div id="content">
        <ul>
          {people.people.map((person) => {
            return (
              <li id="namelistli">
                <Link
                  id="namelist"
                  key={person.id}
                  to={`/${PEOPLE}/${person.id}`}
                >
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
