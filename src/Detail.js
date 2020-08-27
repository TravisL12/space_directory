import React, { useRef } from 'react';
import './App.css';
import axios from 'axios';

export default function Detail({ person }) {
  const data = [],
    dataInfo = [];
  const moviePoster = useRef(null);
  const movieTitle = useRef(null);

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
    if (key === 'films') {
      data.push(key);
      // for (let i = 0; i < person[key].length; i++) {
      //   dataInfo.push(person[key][i]);
      //   callApi(person[key][i]);
      // }
      // console.log(person[key]);
      dataInfo.push(person[key][0]);
      callApi(person[key][0]);
    }
  }
  async function callApi(movie) {
    try {
      const res = await axios.get(movie);
      const omdb = await axios.get('http://www.omdbapi.com/', {
        params: {
          apikey: 764452 + 'e7',
          t: res.data.title,
          y: res.data.release_date.substring(0, 4),
        },
      });
      // console.log(omdb.data);
      movieTitle.current = res.data.title;
      moviePoster.current.setAttribute('src', omdb.data.Poster);
    } catch (err) {
      console.error('There was a problem fetching:', err);
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
            return (
              <li key={index}>
                {value.includes('films') ? (
                  <a
                    href={value}
                    key={index}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {value}
                    <br />
                    {movieTitle.current} <br />
                    <img ref={moviePoster} src="" alt="" />
                  </a>
                ) : value.includes('planets') ? (
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
}
