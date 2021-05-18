import React, { useState, useEffect } from 'react';
import '../App.css';
import Row from './Row';
import CollectionRow from './CollectionRow';
import { fetchMovie, fetchStarWars, isUrl, SW_API_URL } from '../helper';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  GET_STAR_WARS_FILM,
  GET_STAR_WARS_PEOPLE,
  GET_STAR_WARS_VEHICLE,
} from '../queries';
import {
  PEOPLE,
  PLANETS,
  VEHICLES,
  STARSHIPS,
  SPECIES,
  FILMS,
} from '../constants';

const useFetchGraph = ({ id, type }) => {
  let query;
  switch (type) {
    case PEOPLE:
      query = GET_STAR_WARS_PEOPLE;
      break;
    case PLANETS:
      query = GET_STAR_WARS_PEOPLE;
      break;
    case VEHICLES:
      query = GET_STAR_WARS_VEHICLE;
      break;
    case STARSHIPS:
      query = GET_STAR_WARS_PEOPLE;
      break;
    case SPECIES:
      query = GET_STAR_WARS_PEOPLE;
      break;
    case FILMS:
      query = GET_STAR_WARS_FILM;
      break;
  }

  return useQuery(query, {
    variables: { id },
  });
};

export default function Detail() {
  const [personDetail, setPersonDetail] = useState();
  const params = useParams();

  const { data, loading, error } = useFetchGraph(params);
  console.log(data, 'data');

  const getDetails = async (details, attr, api) => {
    if (!details[attr]) {
      return Promise.resolve();
    }
    const data = details[attr].map((url) => {
      return api(url);
    });

    return await Promise.all(data);
  };

  const loadDetails = async () => {
    const personCopy = await fetchStarWars(
      `${SW_API_URL}/${params.type}/${params.id}`
    );
    const personKeys = Object.entries(personCopy);
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
  }, [params]);

  if (!personDetail || loading) {
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
      <h2>Details for {`${personDetail.name || personDetail.title}`}</h2>
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
