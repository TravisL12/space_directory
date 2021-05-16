const { RESTDataSource } = require('apollo-datasource-rest');
const {
  PEOPLE,
  PLANETS,
  VEHICLES,
  STARSHIPS,
  SPECIES,
  FILMS,
} = require('./serverConstants');

class StarWarsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://swapi.dev/api';
  }

  async getData({ id, type }) {
    const response = await this.get(`/${type}/${id}`);
    switch (type) {
      case PEOPLE:
        return this.personReducer(response, id);
      case PLANETS:
        return this.personReducer(response, id);
      case VEHICLES:
        return this.personReducer(response, id);
      case STARSHIPS:
        return this.personReducer(response, id);
      case SPECIES:
        return this.personReducer(response, id);
      case FILMS:
        return this.personReducer(response, id);
    }
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
