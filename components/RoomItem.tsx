import * as React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';

import { Room } from '../types';

const RoomItem = (props: { room: Room, onPress: () => void}) => {
  const { room, onPress } = props;

  // set default room pic if there is none in data
  const roomPicSource = room.roomPic ? {uri: `${room.roomPic}`} : require('../assets/images/friends-door-room.png');

  return (
    <View style={styles.container}>
      <Pressable onPress={onPress} style={styles.pressable}>
        <Image 
          source={roomPicSource}
          style={styles.roomLogo}
        />
        <Text style={styles.roomTitle}>{room.name}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 40,
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  roomLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  roomTitle: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'BeVietnam_400Regular'
  }
});

export default RoomItem;