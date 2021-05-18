import { gql } from '@apollo/client';
import { PEOPLE, VEHICLES, FILMS } from './constants';

const GET_STAR_WARS_PEOPLE = gql`
  query GetData($id: String!) {
    starWarsPeople(id: $id) {
      id
      name
      birth_year
      eye_color
      gender
      hair_color
      height
      mass
      skin_color
      homeworld
      films
      species
      starships
      vehicles
      url
      created
      edited
    }
  }
`;
const GET_STAR_WARS_VEHICLE = gql`
  query GetData($id: String!) {
    starWarsVehicle(id: $id) {
      id
      name
      model
      vehicle_class
      manufacturer
      length
      cost_in_credits
      crew
      passengers
      max_atmosphering_speed
      cargo_capacity
      consumables
      films
      pilots
      url
      created
      edited
    }
  }
`;
const GET_STAR_WARS_FILM = gql`
  query GetData($id: String!) {
    starWarsFilm(id: $id) {
      id
      title
      episode_id
      opening_crawl
      director
      producer
      release_date
      species
      starships
      vehicles
      characters
      planets
      url
      created
      edited
    }
  }
`;

export const STAR_WARS_QUERIES = {
  [PEOPLE]: GET_STAR_WARS_PEOPLE,
  [VEHICLES]: GET_STAR_WARS_VEHICLE,
  [FILMS]: GET_STAR_WARS_FILM,
};
