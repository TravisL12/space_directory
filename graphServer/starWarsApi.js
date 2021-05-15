const { RESTDataSource } = require('apollo-datasource-rest');

class StarWarsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://swapi.dev/api';
  }

  async getPerson({ id }) {
    const response = await this.get(`/people/${id}`);
    return this.personReducer(response, id);
  }

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
