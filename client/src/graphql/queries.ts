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

export const ROOM = gql`
  query room($id: ID!) {
    room(id: $id) {
      id
      name
      createdAt
      users {
        id
        name
      }
      messages {
        id
        text
        user {
          name
        }
      }
    }
  }
`;

export const JOIN_ROOM = gql`
  mutation joinRoom($id: ID!) {
    joinRoom(id: $id) {
      id
      name
    }
  }
`;

export const MESSAGES = gql`
  query GetMessages {
    messages {
      id
      text
      user {
        name
      }
    }
  }
`;

export const MESSAGE_CREATED = gql`
  subscription {
    messageCreated {
      id
      text
      user {
        name
      }
    }
  }
`;
