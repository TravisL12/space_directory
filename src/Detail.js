import React, { useState, useEffect } from 'react';
import './App.css';
import DetailRow from './DetailRow';
import { fetchMovie } from './helper';

function hideDetails() {
  window.location = '#';
}

export default function Detail({ person }) {
  const [personDetail, setPersonDetail] = useState({});
  const getPosters = async (details) => {
    const posters = details.films.map((film) => {
      return fetchMovie(film);
    });
    details.films = await Promise.all(posters);
    setPersonDetail(details);
  };

  useEffect(() => {
    getPosters(person);
  }, [person]);

  return (
    <div>
      <button id="hideDetails" onClick={hideDetails}>
        Close
      </button>
      <h2>Details for {`${personDetail.name}`}</h2>
      <div id="content">
        <ul>
          {Object.keys(personDetail).map((key) => (
            <DetailRow key={key} datakey={key} value={personDetail[key]} />
          ))}
        </ul>
      </div>
    </div>
  );
}
