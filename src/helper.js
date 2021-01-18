import axios from 'axios';

const SW_API_URL = 'https://swapi.dev/api';
const OMDB_API_URL = 'http://www.omdbapi.com/';

const fetchPeople = async () => {
  const res = await axios.get(`${SW_API_URL}/people`);
  return res.data.results.map((person, idx) => {
    person.id = idx + 1;
    return person;
  });
};

const fetchStarWars = async (url) => {
  const res = await axios.get(url);
  return res.data.results;
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

export { fetchStarWars, fetchPeople, fetchMovie };
