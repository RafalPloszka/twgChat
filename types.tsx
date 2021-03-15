import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  Main: { title: string};
  Room: RoomParamList;
  NotFound: { title: string };
};

export type RoomParamList = {
  room: RoomParam;
};

export type RoomParam = {
  roomId: string;
  roomName: string;
}

export type RoomProps = StackScreenProps<RootStackParamList, 'Room'>;

export type MainProps = StackScreenProps<RootStackParamList, 'Main'>;

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  profilePic: string;
}

export type Message = {
  body: string;
  id: string;
  insertedAt: string;
  user: User;
};

export type Room = {
  id: string;
  name: string;
  messages: [Message];
  roomPic: string;
  user: User;
};