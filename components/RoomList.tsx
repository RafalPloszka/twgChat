import * as React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';

import { MainProps } from '../types';
import RoomItem from './RoomItem';
import { GET_ROOMS } from '../queries';

const RoomList = ({ navigation }: MainProps ) => {
  const { data, loading, error } = useQuery(GET_ROOMS);

  if (loading) return <Text style={styles.centeredText}>Loading rooms...</Text>
  
  if (error) return <Text>Oops, something went wrong :(</Text>;

  const roomsData = data.usersRooms.rooms;

  return roomsData ? (
    <View style={styles.container}>
      <FlatList
        data={roomsData}
        renderItem={({ item }) => {
          return (
            <RoomItem
              room={item}
              onPress={() => navigation.navigate('Room', { room: { roomId: item.id, roomName: item.name } })} />
          );
        }}
        keyExtractor={item => item.id}
      />
    </View>
  )
  : (
    <View style={styles.container}>
      <Text style={styles.centeredText}>You don't belong to any room at the moment :(</Text> 
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  centeredText: {
    textAlign: 'center',
    fontFamily: 'BeVietnam_400Regular'
  }
});

export default RoomList;