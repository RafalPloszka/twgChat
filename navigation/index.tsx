import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { RootStackParamList } from '../types';

import NotFoundScreen from '../screens/NotFoundScreen';
import MainScreen from '../screens/MainScreen';
import RoomScreen from '../screens/RoomScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          name="Main"
          component={MainScreen}
          options={{ title: 'Chatly' }} 
        />
        <Stack.Screen 
          name="Room"
          component={RoomScreen}
          options={({
            route: {
              params: {
                room: { roomId, roomName},
              },
            },
          }) => ({
            title: `${roomName}`
          })}
        />
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen} 
          options={{ title: 'Oops!' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
