import React, { useState, useEffect } from 'react';
import '../App.css';
import { fetchStarWars, isUrl } from '../helper';

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
              return datakey === 'films' ? (
                <img
                  key={`collection-row-${idx}`}
                  className="filmPoster"
                  src={d.Poster}
                  alt=""
                />
              ) : (
                <div key={`collection-row-${idx}`}>{d.name || d.Title}</div>
              );
            })}
      </div>
    </li>
  );
}
