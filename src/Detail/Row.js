import React from 'react';
import '../App.css';

export default function Row({ datakey, value }) {
  return (
    <li>
      <div>{datakey}</div>
      <div>
        {Array.isArray(value) ? (
          value.map((d, idx) => {
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
