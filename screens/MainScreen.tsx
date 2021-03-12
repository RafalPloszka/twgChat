import * as React from 'react';
import { StyleSheet } from 'react-native';

import RoomList from '../components/RoomList';
import { Text, View } from '../components/Themed';

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <RoomList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
