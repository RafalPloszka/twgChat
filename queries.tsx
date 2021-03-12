import { gql } from '@apollo/client';

export const GET_ROOMS = gql`
  query GetRooms {usersRooms {
    user {
      email,
      firstName,
      lastName,
      id,
      role
    }
    rooms {
      id,
      name,
      roomPic
    }
  }}
`;

export const  GET_SINGLE_ROOM = gql`
  query GetSingleRoom($id: ID!) {
    room(id: $id) {
      id, 
      name,
      messages {
        body,
        id,
        insertedAt,
        user {
          firstName
        }
      }
      roomPic,
      user {
        email,
        firstName,
        lastName,
        id,
        role
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMesage($body: String!, $roomId: String!) {
    sendMessage(body: $body, roomId: $roomId) {
      id,
      body,
      insertedAt,
      user {
        firstName,
        lastName,
        id,
        profilePic
      }
    }
  }
`;