import React, { useState, useEffect } from 'react';
import '../App.css';
import Row from './Row';
import CollectionRow from './CollectionRow';
import { fetchMovie, fetchStarWars } from '../helper';

function hideDetails() {
  window.location = '#';
}

// const {s
//   birth_year,
//   created,
//   edited,
//   eye_color,
//   gender,
//   hair_color,
//   height,
//   id,
//   mass,
//   name,
//   skin_color,

//   homeworld,
//   films,
//   species,
//   starships,
//   vehicles,
// } = personDetail;

const validAttributes = [
  'birth_year',
  'created',
  'edited',
  'eye_color',
  'gender',
  'hair_color',
  'height',
  'id',
  'mass',
  'name',
  'skin_color',
  'homeworld',
];

const arrayAttributes = ['species', 'starships', 'vehicles'];

export default function Detail({ person }) {
  const [personDetail, setPersonDetail] = useState();

  const getDetails = async (details, attr, api) => {
    const data = details[attr].map((url) => {
      return api(url);
    });

    return await Promise.all(data);
  };

  const loadStarWars = async () => {
    person['films-async'] = await getDetails(person, 'films', fetchMovie);
    for (let i = 0; i < arrayAttributes.length; i++) {
      const key = arrayAttributes[i];
      person[`${key}-async`] = await getDetails(person, key, fetchStarWars);
    }
    setPersonDetail(person);
  };

  useEffect(() => {
    setPersonDetail({});
    loadStarWars();
  }, [person]);

  if (!personDetail) {
    return 'Loading';
  }

  return (
    <div>
      <button id="hideDetails" onClick={hideDetails}>
        Close
      </button>
      <h2>Details for {`${personDetail.name}`}</h2>
      <div id="content">
        <ul>
          {validAttributes.map((key) => (
            <Row key={key} datakey={key} value={personDetail[key]} />
          ))}
          {[...arrayAttributes, 'films'].map((key) => (
            <CollectionRow
              key={key}
              datakey={key}
              value={personDetail[`${key}-async`]}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
