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
            return (
              <li key={index}>
                {value}:{' '}
                {value.includes('films') ? (
                  personDetail.films.map((url) => (
                    <a
                      href={`https://imdb.com/find?q=${url.Title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        className="zoom"
                        src={url.Poster}
                        title={url.Title}
                        alt={url.Title}
                      />
                    </a>
                  ))
                ) : Array.isArray(personDetail[value]) ? (
                  personDetail[value].map((links) => (
                    <ul>
                      <li className="liNada">
                        <a href={links}>{links}</a>
                      </li>
                    </ul>
                  ))
                ) : value.includes('homeworld') ? (
                  <a href={personDetail[value]}>{personDetail[value]}</a>
                ) : value.includes('url') ? (
                  <a href={personDetail[value]}>{personDetail[value]}</a>
                ) : (
                  personDetail[value]
                )}
                {/* : Array.isArray(personDetail[value])
                  // ? personDetail[value].join('\n')
                  // : personDetail[value]
                  // Array.isArray(personDetail[value])
                  // ? personDetail[value].toString().replaceAll(',', '\n')
                  // : personDetail[value] */}
              </li>
            );
          })}
        </ul>
        {Object.keys(personDetail).map((value, index) => {
          let randCrawl = Math.floor(
            Math.random() * Math.floor(personDetail.films.length)
          );
          return (
            <div>
              <br />
              {value.includes('films') ? (
                <div className="crawlTitle">
                  {personDetail.films[randCrawl].Title}
                  <br /> <br />
                  <div className="marquee">
                    <div className="text">
                      {personDetail.films[randCrawl].crawl}
                    </div>
                  </div>
                </div>
              ) : null}
              {/* {value.includes('films')
                ? personDetail.films.map((url) => (
                    <div className="crawlTitle">
                      {url.Title}
                      <br /> <br />
                      <div className="marquee">
                        <div className="text">{url.crawl}</div>
                      </div>
                    </div>
                  ))
                : null} */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
