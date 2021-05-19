import React, { useState, useEffect } from 'react';
import '../App.css';
import Row from './Row';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { STAR_WARS_QUERIES } from '../queries';
import { isEmpty, keys } from 'lodash';

export default function Detail() {
  const [personDetail, setPersonDetail] = useState();
  const params = useParams();

  const { data, loading } = useQuery(STAR_WARS_QUERIES[params.type], {
    variables: { id: params.id },
  });

  useEffect(() => {
    if (data) {
      setPersonDetail(Object.values(data)[0]);
    }
  }, [data, loading]);

  if (!personDetail || loading) {
    return 'Loading';
  }

  return (
    <div>
      <Link to="/">Back</Link>
      <h2>Details for {`${personDetail.name || personDetail.title}`}</h2>
      <div id="content">
        <ul>
          {keys(personDetail).map(
            (key) =>
              !isEmpty(personDetail[key]) && (
                <Row key={key} datakey={key} value={personDetail[key]} />
              )
          )}
        </ul>
      </div>
    </div>
  );
}
