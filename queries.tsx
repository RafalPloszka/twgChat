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
`