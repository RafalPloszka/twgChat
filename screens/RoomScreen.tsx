import * as React from 'react';
import { StyleSheet, Button } from 'react-native';
import { useQuery } from '@apollo/client';

import MessagesList from '../components/MessagesList';
import MessageForm from '../components/MessageForm';
import { View, Text } from '../components/Themed';

import { GET_SINGLE_ROOM } from '../queries';

export default function RoomScreen({ navigation, route }) {
  const roomId = route.params.room.roomId;
  const { data, error, loading } = useQuery(GET_SINGLE_ROOM, {
    variables: { id: roomId },
  });

  if (loading) return <Text>Loading...</Text>;

  const roomTitle = data.room.name;
  const messages = data.room.messages;

  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.goBack()} title="Back"/>
      <Text>{roomTitle}</Text>
      <MessagesList messages={messages}/>
      <MessageForm roomId={roomId}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
