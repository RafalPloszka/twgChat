import * as React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { useQuery } from '@apollo/client';
import {useFonts, BeVietnam_400Regular } from '@expo-google-fonts/be-vietnam';

import { Chat } from '../components/Chat';
import { View, Text } from '../components/Themed';
import { RoomProps } from '../types';
import { GET_SINGLE_ROOM, MESSAGES_SUBSCRIPTION } from '../queries';

export default function RoomScreen({ route, navigation }: RoomProps) {
  let [fontsLoaded] = useFonts({
    BeVietnam_400Regular,
  });
  const roomId = route.params.room.roomId;
  const { subscribeToMore, data, error, loading } = useQuery(GET_SINGLE_ROOM, {
    variables: { id: roomId },
  });

  if (loading || !fontsLoaded) return <Text>Loading...</Text>;

  if (error) return <Text>Oops, something went wrong :(</Text>;

  const roomTitle = data.room.name;
  const messages = data.room.messages;
  const currentUser = data.room.user;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable  onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Back</Text>
        </Pressable>
        <Text style={styles.title}>{roomTitle}</Text>
      </View>
      <View style={styles.chatContainer}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#5B61B9',
  },
  header: {
    height: '20%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'left',
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#5B61B9'
  },
  backButton: {
    color: '#8D90C1'
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    marginTop: 12,
    fontFamily: 'BeVietnam_400Regular'
  },
  chatContainer: {
    height: '80%',
    width: '100%',
    padding: 20,
    paddingTop: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden'
  }
});
