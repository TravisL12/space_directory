import React, { useState, useEffect } from 'react';
import '../App.css';
import Row from './Row';
import CollectionRow from './CollectionRow';
import { fetchMovie, fetchStarWars, isUrl, SW_API_URL } from '../helper';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { STAR_WARS_QUERIES } from '../queries';

export default function Detail() {
  const [personDetail, setPersonDetail] = useState();
  const params = useParams();

  const { data, loading, error } = useQuery(STAR_WARS_QUERIES[params.type], {
    variables: { id: params.id },
  });
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
