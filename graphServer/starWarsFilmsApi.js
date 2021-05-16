const { RESTDataSource } = require('apollo-datasource-rest');

// https://www.apollographql.com/blog/graphql-schema-stitching-8af23354ac37/
// SHOWS how to fetch the Movie posters from 'http://www.omdbapi.com/' with a LINK

class StarWarsFilmsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://www.omdbapi.com';
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

module.exports = StarWarsFilmsAPI;
