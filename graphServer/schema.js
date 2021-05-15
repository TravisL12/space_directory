const { gql } = require('apollo-server');

const typeDefs = gql`
  type Weather {
    id: ID!
    zip: String!
    cityName: String!
    longitude: Float!
    latitude: Float!
    currentWeather: CurrentWeather!
    sunrise: String!
    sunset: String!
  }
  type CurrentWeather {
    status: String!
    description: String!
    temp: Float!
    feels_like: Float!
    tempHigh: Float!
    tempLow: Float!
    pressure: Int!
    humidity: Int!
    windSpeed: Float!
  }
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
    weather(zip: String!): Weather
    starWarsPerson(id: String!): StarWarsPerson
  }
`;

module.exports = typeDefs;
