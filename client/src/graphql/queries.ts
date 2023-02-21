import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation login($name: String!, $pinCode: String!) {
    login(name: $name, pinCode: $pinCode) {
      id
      name
      pinCode
    }
  }
`;

export const CREATE_ROOM = gql`
  mutation createRoom($name: String!, $userId: ID!) {
    createRoom(name: $name, userId: $userId) {
      id
      name
      createdAt
    }
  }
`;

export const DELETE_ROOM = gql`
  mutation deleteRoom($id: ID!) {
    deleteRoom(id: $id) {
      id
    }
  }
`;

export const ROOMS = gql`
  query rooms {
    rooms {
      id
      name
      createdAt
      messages {
        id
      }
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

export const POST_MESSAGE = gql`
  mutation PostMessage($text: String!, $userId: ID!, $roomId: ID!) {
    postMessage(text: $text, userId: $userId, roomId: $roomId) {
      id
      text
      user {
        id
        name
      }
      room {
        id
        name
      }
    }
  }
`;

export const MESSAGE_CREATED = gql`
  subscription messageCreated($roomId: ID!) {
    messageCreated(roomId: $roomId) {
      id
      text
      user {
        id
        name
      }
    }
  }
`;
