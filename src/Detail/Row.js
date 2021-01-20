import React, { useState, useEffect } from 'react';
import '../App.css';
import { fetchStarWars } from '../helper';

const isUrl = (valueString) => {
  if (typeof valueString === 'string') {
    return valueString.match(/^http/);
  }
  return false;
};

export default function DetailRow({ datakey, value }) {
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
      <div>{detail}</div>
    </li>
  );
}
