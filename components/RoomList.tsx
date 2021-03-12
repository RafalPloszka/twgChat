import * as React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { useQuery } from '@apollo/client';

import { GET_ROOMS } from '../queries';

const RoomItem = ({ room, onPress }) => {
  const { id, name, roomPic } = room;

  return (
    <Pressable onPress={onPress}>
      <Text>{name}</Text>
    </Pressable>
  )
}

const RoomList = ({ navigation }) => {
  const { data, loading } = useQuery(GET_ROOMS);

  if (loading) return <Text>Loading...</Text>
  
  const roomsData = data.usersRooms.rooms;
  
  return <View>
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
}

export default RoomList;