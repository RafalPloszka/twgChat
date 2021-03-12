import * as React from 'react';
import { StyleSheet } from 'react-native';

import Room from '../components/Room';
import { View } from '../components/Themed';

export default function RoomScreen() {
  return (
    <View style={styles.container}>
      <Room id="1ab988e2-dbd9-484b-938a-59ca3c1328ca" />
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
