import React from "react";
import { enableScreens } from 'react-native-screens';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen.js';

enableScreens();
const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={HomeScreen} />
      </Stack.Navigator>
  );
};

export default MainStackNavigator;