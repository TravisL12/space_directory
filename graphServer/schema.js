const { gql } = require('apollo-server');

const typeDefs = gql`
  type StarWarsPerson {
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
    films: [String]
    species: [String]
    starships: [String]
    vehicles: [String]
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

  type StarWarsResponse {
    people: StarWarsPerson
    vehicles: StarWarsVehicle
  }

  type Query {
    starWars(id: String!, type: String!): StarWarsResponse
  }
`;

module.exports = typeDefs;
