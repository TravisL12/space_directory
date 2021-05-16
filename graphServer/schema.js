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

  type Query {
    person(id: String!): StarWarsPerson
    planets(id: String!): StarWarsPerson
    vehicles(id: String!): StarWarsPerson
    starships(id: String!): StarWarsPerson
    species(id: String!): StarWarsPerson
    films(id: String!): StarWarsPerson
  }
`;

module.exports = typeDefs;
