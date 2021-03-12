import * as React from 'react';
import { StyleSheet } from 'react-native';

import Room from '../components/Room';
import { View } from '../components/Themed';

export default function RoomScreen({ route }) {
  const roomId = route.params.room.roomId;
  return (
    <View style={styles.container}>
      <Room id={`${roomId}`} />
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
