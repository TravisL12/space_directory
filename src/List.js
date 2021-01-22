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
    const url = list[type]?.next || `${SW_API_URL}/${type}`;
    getList(url);
  }, [type]);

  console.log(list);
  if (list[type]?.items?.length === 0) {
    return <div>loading</div>;
  }

  return (
    <div className="sidebar">
      <div>
        {getList && (
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
          {list[type]?.items?.map((person) => {
            return (
              <li id="namelistli">
                <Link
                  id="namelist"
                  key={person.id}
                  to={`/${type}/${person.id}`}
                >
                  {person.id}. {person.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
