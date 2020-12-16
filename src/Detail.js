import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

async function callApi(film) {
  try {
    const res = await axios.get(film);
    const omdb = await axios.get("http://www.omdbapi.com/", {
      params: {
        apikey: 764452 + "e7",
        t: res.data.title,
        y: res.data.release_date.substring(0, 4),
      },
    });
    console.log(res.data);
    return omdb.data.Poster;
  } catch (err) {
    console.error("There was a problem fetching:", err);
  }
}
function hideDetails() {
  window.location = "#";
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
                {value}:{" "}
                {value.includes("films")
                  ? personDetail.films.map((url) => (
                      <img id="filmPoster" src={url} alt="" />
                    ))
                  : personDetail[value]}
              </li>
            );
          })}
        </ul>
        <div className="marquee">
          <div className="text">
            "It is a period of civil war. Rebel spaceships, striking from a
            hidden base, have won their first victory against the evil Galactic
            Empire. During the battle, Rebel spies managed to steal secret plans
            to the Empire's ultimate weapon, the DEATH STAR, an armored space
            station with enough power to destroy an entire planet. Pursued by
            the Empire's sinister agents, Princess Leia races home aboard her
            starship, custodian of the stolen plans that can save her people and
            restore freedom to the galaxy...."
          </div>
        </div>
      </div>
    </div>
  );
}
