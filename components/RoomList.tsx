import * as React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';

import RoomItem from './RoomItem';
import { GET_ROOMS } from '../queries';

const RoomList = ({ navigation }) => {
  const { data, loading } = useQuery(GET_ROOMS);

  if (loading) return <Text style={styles.centeredText}>Loading rooms...</Text>
  
  const roomsData = data.usersRooms.rooms;
  // const roomsData = null;
  return roomsData ? (
    <View style={styles.container}>
      <FlatList
        data={roomsData}
        renderItem={({ item }) => (
          <RoomItem
            room={item}
            onPress={() => navigation.navigate('Room', { room: { roomId: item.id, roomName: item.name } })}
          />
        )}
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