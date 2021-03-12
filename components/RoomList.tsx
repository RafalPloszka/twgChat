import * as React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_ROOMS } from '../queries';

const Item = ({ title }: { title: string }) => (
    <View>
      <Text>{title}</Text>
    </View>
  );

const renderItem = ({ item }) => (
    <Item title={item.name} />
  );

const RoomList = () => {
  const { data, loading } = useQuery(GET_ROOMS);

  if (loading) return <Text>Loading...</Text>
  
  const roomsData = data.usersRooms.rooms;
  
  return <View>
      <FlatList
        data={roomsData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
}

export default RoomList;