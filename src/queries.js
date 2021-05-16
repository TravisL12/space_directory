import { gql } from '@apollo/client';

export const GET_STAR_WARS = gql`
  query GetData($id: String!, $type: String!) {
    starWars(id: $id, type: $type) {
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
  }
`;
