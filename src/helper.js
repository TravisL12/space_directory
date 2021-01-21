import axios from 'axios';

export const SW_API_URL = 'https://swapi.dev/api';
const OMDB_API_URL = 'http://www.omdbapi.com/';

const fetchStarWars = async (url) => {
  const res = await axios.get(url);
  return res.data;
};

const fetchMovie = async (film) => {
  try {
    const res = await axios.get(film);
    const omdb = await axios.get(OMDB_API_URL, {
      params: {
        apikey: 764452 + 'e7',
        t: res.data.title,
        y: res.data.release_date.substring(0, 4),
      },
    });
    omdb.data.crawl = res.data.opening_crawl;
    return omdb.data;
  } catch (err) {
    console.error('There was a problem fetching:', err);
  }
};

const isUrl = (valueString) => {
  if (typeof valueString === 'string') {
    return valueString.match(/^http/);
  }
  return false;
};

export { fetchStarWars, fetchMovie, isUrl };
