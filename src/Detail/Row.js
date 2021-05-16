import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { fetchStarWars, getIdFromUrl, getTypeFromUrl, isUrl } from '../helper';

export default function Row({ datakey, value }) {
  const [detail, setDetail] = useState();
  const getData = async () => {
    const data = await fetchStarWars(value);
    setDetail(data);
  };

  useEffect(() => {
    isUrl(value) ? getData() : setDetail({ name: value });
  }, [value]);

  const getLink = () => {
    if (!detail) {
      return <span>Loading</span>;
    }
    const id = getIdFromUrl(detail.url);
    const type = getTypeFromUrl(detail.url);

    return id && type ? (
      <Link to={`/${type}/${id}`}>{detail.name || detail.Title}</Link>
    ) : (
      detail.name || detail.Title
    );
  };

  return (
    <li>
      <div>{datakey}</div>
      <div>{getLink()}</div>
    </li>
  );
}
