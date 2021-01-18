import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchStarWars } from './helper';

const isUrl = (valueString) => {
  return valueString.includes('http');
};

export default function DetailRow({ datakey, value }) {
  const [detail, setDetail] = useState(value);
  const getData = async () => {
    const data = await fetchStarWars(value);
    setDetail(data);
  };

  useEffect(() => {
    if (typeof value === 'String' && isUrl(value)) {
      getData();
    }
  }, [value]);

  return (
    <li>
      <div>{datakey}</div>
      {detail && (
        <div>
          {!Array.isArray(detail)
            ? detail
            : detail.map((d) => {
                console.log(d);
                return value === 'films' ? (
                  <img className="filmPoster" src={d.Poster} alt="" />
                ) : (
                  <div>{d}</div>
                );
              })}
        </div>
      )}
    </li>
  );
}
