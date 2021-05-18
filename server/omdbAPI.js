const { RESTDataSource } = require('apollo-datasource-rest');
const { OMDB_API } = require('./constants');

// https://www.apollographql.com/blog/graphql-schema-stitching-8af23354ac37/
// SHOWS how to fetch the Movie posters from 'http://www.omdbapi.com/' with a LINK

class OmdbAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = OMDB_API;
  }

  async getData({ title }) {
    const apikey = '764452e7';
    const response = await this.get(`/?apikey=${apikey}&t=${title}`);
    return this.filmReducer(response);
  }

  filmReducer(film) {
    return {
      title: film.Title,
      year: film.Year,
      plot: film.Plot,
    };
  }
}

module.exports = OmdbAPI;
