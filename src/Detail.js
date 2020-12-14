import React, { useRef } from 'react';
// import React from 'react';
import './App.css';
import axios from 'axios';

export default function Detail({ person }) {
  const data = [],
    dataInfo = [],
    posters = [];
  const moviePoster = useRef([]);
  // moviePoster2 = useRef('');
  // const movieTitle = useRef(null);

  for (let key in person) {
    // if (key === 'name') {
    //   data.push(key);
    //   dataInfo.push(person[key]);
    // }
    // if (key === 'height') {
    //   data[2] = key;
    //   dataInfo[2] = person[key];
    // }
    // if (key === 'hair_color') {
    //   data[1] = key;
    //   dataInfo[1] = person[key];
    // }
    // if (key === 'eye_color' || key === 'birth_year' || key === 'homeworld') {
    //   data.push(key);
    //   dataInfo.push(person[key]);
    // }
    if (
      key === 'name' ||
      key === 'height' ||
      key === 'hair_color' ||
      key === 'eye_color' ||
      key === 'birth_year' ||
      key === 'homeworld'
    ) {
      data.push(key);
      dataInfo.push(person[key]);
    }

    if (key === 'films') {
      data.push(key);
      for (let i = 0; i < person[key].length; i++) {
        dataInfo.push(person[key][i]);
        // callApi(person[key][i]);
        callApi(person[key][i])
          .then((val) => {
            // console.log(val);
            posters.push(val);
          })
          .catch((error) => {
            // Handle/report error
          });
        // posters.push(moviePoster.current.currentSrc);
      }
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
      // if (moviePoster.current)
      //   moviePoster.current.setAttribute('src', omdb.data.Poster);
      // if (moviePoster2.current)
      //   moviePoster2.current.setAttribute('src', omdb.data.Poster);

      // moviePoster.current.push(omdb.data.Poster);
      // console.log(moviePoster.current.currentSrc);
      // posters.push(moviePoster.current.currentSrc);
      // dataInfo.push(omdb.data.Poster);
      // console.log(posters);
      // movieTitle.current = res.data.title;
      return omdb.data.Poster;
    } catch (err) {
      console.error('There was a problem fetching:', err);
    }
  }
  function hideDetails() {
    window.location = '#';
  }
  // console.log(posters);
  // console.log(moviePoster);
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
                    {/*{index > 5 ? <img src={posters[0]} alt="" /> : null}*/}
                    {value}
                    <br />
                    {/* {console.log(
                      callApi(value)
                        .then((val) => {
                          console.log(val);
                        })
                        .catch((error) => {
                          // Handle/report error
                        })
                    )} */}
                    {/* <img src={callApi(value)} alt="" /> */}

                    {/* <p ref={movieTitle}></p> */}
                    {/* {movieTitle.current} <br /> */}
                    {/* {console.log(Object.values(posters))} */}
                    {/* {posters.map((poster) => {
                      return <div><img src={poster} alt="" /></div>;
                    })} */}
                    {console.log(moviePoster)}
                    <img ref={moviePoster} src="" alt="" />
                    {/* <img src={dataInfo[9]} alt="" /> */}
                    {/* {moviePoster.current} */}
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
        {/* <ul>
          {posters.map((value, index) => {
            return <li key={index}>{value}</li>;
          })}
        </ul> */}
      </div>
    </div>
  );
}
