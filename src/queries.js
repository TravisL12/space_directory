import { gql } from '@apollo/client';

export const GET_STAR_WARS = gql`
  query GetData($id: String!, $type: String!) {
    starWars(id: $id, type: $type) {
      people {
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
      vehicles {
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
  }
`;
