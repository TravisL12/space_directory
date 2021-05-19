const { gql } = require('apollo-server');

const typeDefs = gql`
  type StarWarsPeople {
    id: ID!
    name: String
    birth_year: String
    eye_color: String
    gender: String
    hair_color: String
    height: String
    mass: String
    skin_color: String
    homeworld: String
    films: [StarWarsFilm]
    species: [String]
    starships: [String]
    vehicles: [StarWarsVehicle]
    url: String
    created: String
    edited: String
  }

  type StarWarsVehicle {
    id: ID!
    name: String
    model: String
    vehicle_class: String
    manufacturer: String
    length: String
    cost_in_credits: String
    crew: String
    passengers: String
    max_atmosphering_speed: String
    cargo_capacity: String
    consumables: String
    films: [String]
    pilots: [String]
    url: String
    created: String
    edited: String
  }

  type StarWarsFilm {
    id: ID!
    title: String
    episode_id: Int
    opening_crawl: String
    director: String
    producer: String
    release_date: String
    species: [String]
    starships: [String]
    vehicles: [String]
    characters: [String]
    planets: [String]
    url: String
    created: String
    edited: String
    omdbInfo: OmdbFilm
  }

  type OmdbFilm {
    id: ID!
    title: String
    year: String
    plot: String
    poster: String
  }

  type Query {
    starWarsPeople(id: String!): StarWarsPeople
    starWarsVehicle(id: String!): StarWarsVehicle
    starWarsFilm(id: String!): StarWarsFilm
    omdbFilm(title: String!): OmdbFilm
  }
`;

module.exports = typeDefs;
