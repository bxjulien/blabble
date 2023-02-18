import gql from 'graphql-tag';

export const CREATE_ROOM = gql`
  mutation createRoom($name: String!) {
    createRoom(name: $name) {
      id
      name
      createdAt
    }
  }
`;

export const ROOMS = gql`
  query rooms {
    rooms {
      id
      name
      createdAt
    }
  }
`;
