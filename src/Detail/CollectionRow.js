import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { fetchStarWars, getIdFromUrl, getTypeFromUrl, isUrl } from '../helper';

export default function CollectionRow({ datakey, value }) {
  const [detail, setDetail] = useState();
  const getData = async () => {
    const data = await fetchStarWars(value);
    setDetail(data.name);
  };

  useEffect(() => {
    isUrl(value) ? getData() : setDetail(value);
  }, [value]);

  return (
    <li>
      <div>{datakey}</div>
      <div>
        {!detail
          ? 'loading'
          : detail.map((d, idx) => {
              const id = getIdFromUrl(d.url);
              const type = getTypeFromUrl(d.url);
              const link =
                id && type ? (
                  <Link to={`/${type}/${id}`}>{d.name || d.Title}</Link>
                ) : (
                  d.name || d.Title
                );
              return datakey === 'films' ? (
                <div>
                  <img
                    key={`collection-row-${idx}`}
                    className="filmPoster"
                    src={d.Poster}
                    alt=""
                  />
                  {link}
                </div>
              ) : (
                <div key={`collection-row-${idx}`}>{link}</div>
              );
            })}
      </div>
    </li>
  );
}
