const { gql } = require('apollo-server');

const typeDefs = gql`
  type StarWarsPerson {
    id: ID!
    name: String
    height: String
    mass: String
    hair_color: String
    skin_color: String
    eye_color: String
    birth_year: String
    gender: String
  }

  type StarWarsVehicle {
    id: ID!
    name: String!
    model: String!
    manufacturer: String!
    cost_in_credits: String!
    length: String!
    max_atmosphering_speed: String!
    crew: String!
    passengers: String!
    cargo_capacity: String!
    consumables: String!
    vehicle_class: String!
    created: String!
    edited: String!
    url: String!
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
