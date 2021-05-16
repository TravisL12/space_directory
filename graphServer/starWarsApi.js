const { RESTDataSource } = require('apollo-datasource-rest');
const {
  PEOPLE,
  PLANETS,
  VEHICLES,
  STARSHIPS,
  SPECIES,
  FILMS,
} = require('./serverConstants');

// https://www.apollographql.com/blog/graphql-schema-stitching-8af23354ac37/
// SHOWS how to fetch the Movie posters from 'http://www.omdbapi.com/' with a LINK

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
        return this.vehicleReducer(response, id);
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
      people: {
        id: id || 0,
        name: person.name,
        birth_year: person.birth_year,
        eye_color: person.eye_color,
        gender: person.gender,
        hair_color: person.hair_color,
        height: person.height,
        mass: person.mass,
        skin_color: person.skin_color,
        homeworld: person.homeworld,
        films: person.films,
        species: person.species,
        starships: person.starships,
        vehicles: person.vehicles,
        url: person.url,
        created: person.created,
        edited: person.edited,
      },
    };
  }
  vehicleReducer(vehicle, id) {
    return {
      vehicles: {
        id: id || 0,
        name: vehicle.name,
        model: vehicle.model,
        vehicle_class: vehicle.vehicle_class,
        manufacturer: vehicle.manufacturer,
        length: vehicle.length,
        cost_in_credits: vehicle.cost_in_credits,
        crew: vehicle.crew,
        passengers: vehicle.passengers,
        max_atmosphering_speed: vehicle.max_atmosphering_speed,
        cargo_capacity: vehicle.cargo_capacity,
        consumables: vehicle.consumables,
        films: vehicle.films,
        pilots: vehicle.pilots,
        url: vehicle.url,
        created: vehicle.created,
        edited: vehicle.edited,
      },
    };
  }
}

module.exports = StarWarsAPI;
