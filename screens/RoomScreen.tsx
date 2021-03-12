import * as React from 'react';
import { StyleSheet, Button } from 'react-native';

import Room from '../components/Room';
import { View } from '../components/Themed';

export default function RoomScreen({ navigation, route }) {
  const roomId = route.params.room.roomId;
  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.goBack()} title="Back"/>
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
