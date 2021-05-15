import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './App.css';
import { SW_API_URL, fetchStarWars, getIdFromUrl } from './helper';

export default function List() {
  const { type } = useParams();
  const [list, setList] = useState({ [type]: { items: [] } });
  const getList = async (url) => {
    try {
      const { next, results } = await fetchStarWars(url);
      const newItems = results.map((item) => {
        item.id = getIdFromUrl(item.url);
        return item;
      });
      setList({
        ...list,
        [type]: {
          next,
          items: [...(list[type]?.items || []), ...newItems],
        },
      });
    } catch (err) {
      console.error('There was a problem fetching people:', err);
    }
  };

  useEffect(() => {
    if (!type) return;
    const next = list[type]?.next;
    const url = next || `${SW_API_URL}/${type}`;
    if (!next && (!list[type] || list[type]?.items?.length === 0)) getList(url);
  }, [type]);

  if (type && list[type]?.items?.length === 0) {
    return <div>loading</div>;
  }

  return (
    <div className="sidebar">
      <div>
        {type && (
          <button
            disabled={!list[type]?.next}
            onClick={() => getList(list[type]?.next)}
          >
            Next
          </button>
        )}
      </div>
      <div id="content">
        <ul>
          {list[type]?.items?.map((item) => {
            return (
              <li id="namelistli" key={item.id}>
                <Link id="namelist" key={item.id} to={`/${type}/${item.id}`}>
                  {item.id}. {item.name || item.Title || item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
