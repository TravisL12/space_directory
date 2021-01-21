import React, { useState, useEffect } from 'react';
import '../App.css';
import Row from './Row';
import CollectionRow from './CollectionRow';
import { fetchMovie, fetchStarWars, isUrl } from '../helper';
import { Link } from 'react-router-dom';

export default function Detail({ person }) {
  const [personDetail, setPersonDetail] = useState();

  const getDetails = async (details, attr, api) => {
    const data = details[attr].map((url) => {
      return api(url);
    });

    return await Promise.all(data);
  };

  const loadDetails = async () => {
    const personCopy = { ...person };
    const personKeys = Object.entries(person);
    for (let i = 0; i < personKeys.length; i++) {
      const [key, value] = personKeys[i];
      const allUrls = Array.isArray(value) && value.every((val) => isUrl(val));
      if (allUrls && key !== 'films') {
        personCopy[`${key}-async`] = await getDetails(
          personCopy,
          key,
          fetchStarWars
        );
      }
    }
    personCopy['films-async'] = await getDetails(
      personCopy,
      'films',
      fetchMovie
    );
    setPersonDetail(personCopy);
  };

  useEffect(() => {
    loadDetails();
  }, [person]);

  if (!personDetail) {
    return 'Loading';
  }

  const validAttributes = Object.keys(personDetail).filter(
    (key) => !Array.isArray(personDetail[key])
  );
  const arrayAttributes = Object.keys(personDetail).filter(
    (key) => Array.isArray(personDetail[key]) && !key.includes('async')
  );

  return (
    <div>
      <Link to="/">Back</Link>
      <h2>Details for {`${personDetail.name}`}</h2>
      <div id="content">
        <ul>
          {validAttributes.map((key) => (
            <Row key={key} datakey={key} value={personDetail[key]} />
          ))}
          {arrayAttributes.map((key) => (
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
