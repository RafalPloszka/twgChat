import * as React from 'react';
import { StyleSheet, Button } from 'react-native';
import { useQuery } from '@apollo/client';

import MessagesList from '../components/MessagesList';
import MessageForm from '../components/MessageForm';
import { Chat } from '../components/Chat';
import { View, Text } from '../components/Themed';

import { GET_SINGLE_ROOM, MESSAGES_SUBSCRIPTION } from '../queries';

export default function RoomScreen({ navigation, route }) {
  const roomId = route.params.room.roomId;
  const { subscribeToMore, data, error, loading } = useQuery(GET_SINGLE_ROOM, {
    variables: { id: roomId },
  });

  if (loading) return <Text>Loading...</Text>;

  const roomTitle = data.room.name;
  const messages = data.room.messages;
  const currentUser = data.room.user

  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.goBack()} title="Back"/>
      <Text>{roomTitle}</Text>
      <Chat 
        messages={messages}
        roomId={roomId}
        currentUser={currentUser}
        subscribeToNewMessages={() =>
          subscribeToMore({
            document: MESSAGES_SUBSCRIPTION,
            variables: { roomId: roomId },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const newFeedItem = subscriptionData.data.messageAdded;
              return Object.assign({}, prev, {
                room: {
                  messages: [newFeedItem, ...prev.room.messages]
                }
              });
            }
          })
        }
      />
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
