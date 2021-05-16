import { gql } from '@apollo/client';

export const GET_STAR_WARS_PERSON = gql`
  query GetPerson($id: String!) {
    person(id: $id) {
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
