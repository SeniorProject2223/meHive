import React from "react";
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from '@react-navigation/stack';
import NavigationContainer from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen.js';

enableScreens();
const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;