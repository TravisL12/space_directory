const { RESTDataSource } = require('apollo-datasource-rest');
const {
  PEOPLE,
  PLANETS,
  VEHICLES,
  STARSHIPS,
  SPECIES,
  FILMS,
  SWAPI_URL,
} = require('./constants');

// https://www.apollographql.com/blog/graphql-schema-stitching-8af23354ac37/
// SHOWS how to fetch the Movie posters from 'http://www.omdbapi.com/' with a LINK

class StarWarsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = SWAPI_URL;
  }

  async getPeople({ id }) {
    const response = await this.get(`/${PEOPLE}/${id}`);
    return this.peopleReducer(response, id);
  }
  async getPlanet({ id }) {
    const response = await this.get(`/${PLANETS}/${id}`);
    return this.peopleReducer(response, id);
  }
  async getVehicle({ id }) {
    const response = await this.get(`/${VEHICLES}/${id}`);
    return this.vehicleReducer(response, id);
  }
  async getStarship({ id }) {
    const response = await this.get(`/${STARSHIPS}/${id}`);
    return this.peopleReducer(response, id);
  }
  async getSpecies({ id }) {
    const response = await this.get(`/${SPECIES}/${id}`);
    return this.peopleReducer(response, id);
  }
  async getFilm({ id }) {
    const response = await this.get(`/${FILMS}/${id}`);
    return this.filmReducer(response, id);
  }

  peopleReducer(person, id) {
    return {
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
    };
  }
  vehicleReducer(vehicle, id) {
    return {
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
    };
  }
  filmReducer(film, id) {
    return {
      id: id || 0,
      title: film.title,
      episode_id: film.episode_id,
      opening_crawl: film.opening_crawl,
      director: film.director,
      producer: film.producer,
      release_date: film.release_date,
      species: film.species,
      starships: film.starships,
      vehicles: film.vehicles,
      characters: film.characters,
      planets: film.planets,
      url: film.url,
      created: film.created,
      edited: film.edited,
    };
  }
}

module.exports = StarWarsAPI;
