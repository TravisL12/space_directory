import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function hideDetails() {
  window.location = '#';
}

async function callApi(film) {
  try {
    const res = await axios.get(film);
    const omdb = await axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: 764452 + 'e7',
        t: res.data.title,
        y: res.data.release_date.substring(0, 4),
      },
    });
    omdb.data.crawl = res.data.opening_crawl;
    return omdb.data;
  } catch (err) {
    console.error('There was a problem fetching:', err);
  }
}

export default function Detail({ person }) {
  const [personDetail, setPersonDetail] = useState({});
  const getPosters = async (details) => {
    const posters = [];
    for (let i = 0; i < details.films.length; i++) {
      const film = details.films[i];
      posters.push(callApi(film));
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
            const detail = personDetail[value];
            return (
              detail && (
                <li key={index}>
                  <div>{value}</div>
                  <div>
                    {!Array.isArray(detail)
                      ? detail
                      : detail.map((d) =>
                          value === 'films' ? (
                            <img className="filmPoster" src={d.Poster} alt="" />
                          ) : (
                            <div>{d}</div>
                          )
                        )}
                  </div>
                </li>
              )
            );
          })}
        </ul>
      </div>
    </div>
  );
}
