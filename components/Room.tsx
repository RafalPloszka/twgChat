import * as React from 'react';
import { View, Text } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_ROOM } from '../queries';

const Room = props => {
  const { data, error, loading } = useQuery(GET_SINGLE_ROOM, {
    variables: { id: props.id },
  });

  if (loading) return <Text>Loading...</Text>;
  console.log(data);
  // const finalData = data.room.name;
  
  return (
    <View>
      <Text>{data.room.name}</Text>
    </View>
  );
}

export default Room;