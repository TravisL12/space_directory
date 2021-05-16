import { gql } from '@apollo/client';

export const GET_STAR_WARS = gql`
  query GetData($id: String!, $type: String!) {
    starWars(id: $id, type: $type) {
      people {
        id
        name
        height
        mass
        hair_color
        skin_color
        eye_color
        birth_year
        gender
      }
      vehicles {
        id
        name
        model
        manufacturer
        cost_in_credits
        length
        max_atmosphering_speed
        crew
        passengers
        cargo_capacity
        consumables
        vehicle_class
        created
        edited
        url
      }
    }
  }
`;
