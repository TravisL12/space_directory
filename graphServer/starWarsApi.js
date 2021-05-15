const { RESTDataSource } = require('apollo-datasource-rest');

class StarWarsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://swapi.dev/api';
  }
  //this is our main fetch call for our weather query
  async getPerson({ id }) {
    const response = await this.get(`/people/${id}`);
    return this.personReducer(response, id);
  }
  // our async call will pass data to this reducer, which will return the data
  //mapped to our GraphQL schema
  personReducer(person, id) {
    return {
      id: id || 0,
      name: person.name,
      height: person.height,
      mass: person.mass,
      hair_color: person.hair_color,
      skin_color: person.skin_color,
      eye_color: person.eye_color,
      birth_year: person.birth_year,
      gender: person.gender,
    };
  }
}

module.exports = StarWarsAPI;
