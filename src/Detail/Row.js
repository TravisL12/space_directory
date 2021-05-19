import { has } from 'lodash';
import React from 'react';
import '../App.css';

export default function Row({ datakey, value }) {
  return (
    <li>
      <div>{datakey}</div>
      <div>
        {Array.isArray(value) ? (
          value.map((d, idx) => {
            if (has(d, 'omdbInfo.poster')) {
              return (
                <img
                  key={`collection-row-${idx}`}
                  className="filmPoster"
                  src={d.omdbInfo.poster}
                  alt=""
                />
              );
            }
            const display = typeof d === 'string' ? d : d.name || d.title;
            return <div key={`collection-row-${idx}`}>{display}</div>;
          })
        ) : (
          <div>{value}</div>
        )}
      </div>
    </li>
  );
}
