import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import {useFonts, BeVietnam_400Regular, BeVietnam_700Bold } from '@expo-google-fonts/be-vietnam';

import RoomList from '../components/RoomList';
import { Text, View } from '../components/Themed';

export default function MainScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    BeVietnam_400Regular,
    BeVietnam_700Bold
  });

  if (!fontsLoaded) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chatly</Text>
        <Image style={styles.logo} source={require('../assets/images/twg_logo.png')}/>
      </View>
      <View style={styles.roomListContainer}>
        <RoomList navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#5B61B9',
  },
  header: {
    height: '20%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'left',
    padding: 20,
    backgroundColor: '#5B61B9'
  },
  title: {
    fontSize: 38,
    color: '#FFFFFF',
    fontFamily: 'BeVietnam_700Bold'
  },
  logo: {
    width: 50,
    height: 50
  },
  roomListContainer: {
    height: '80%',
    width: '100%',
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden'
  }
});
