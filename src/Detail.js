import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

async function callApi(res) {
  try {
    const omdb = await axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: 764452 + 'e7',
        t: res.data.title,
        y: res.data.release_date.substring(0, 4),
      },
    });
    return omdb.data.Poster;
  } catch (err) {
    console.error('There was a problem fetching:', err);
  }
}
function hideDetails() {
  window.location = '#';
}

export default function Detail({ person }) {
  const [personDetail, setPersonDetail] = useState({});
  // const title = [];
  const getPosters = async (details) => {
    const posters = [];

    for (let i = 0; i < details.films.length; i++) {
      const film = details.films[i];
      const res = await axios.get(film);
      // title.push(res.data.title);
      posters.push(callApi(res));
    }

    details.films = await Promise.all(posters);

    setPersonDetail(details);
  };

  useEffect(() => {
    const details = {};
    for (let key in person) {
      details[key] = person[key];
    }

    getPosters(details);
  }, [person]);

  return (
    <div>
      <button id="hideDetails" onClick={hideDetails}>
        <img id="trooper" src="storm.jfif" alt="stormtrooper" /> Hide Details
      </button>
      <h2>Details for {`${personDetail.name}`}</h2>
      <div id="content">
        <ul>
          {Object.keys(personDetail).map((value, index) => {
            return (
              <li key={index}>
                {value}:{' '}
                {value.includes('films')
                  ? personDetail.films.map((url) => (
                      <img id="filmPoster" src={url} alt="" />
                    ))
                  : personDetail[value]}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
