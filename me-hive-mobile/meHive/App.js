/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


// import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
// import MainStackNavigator from './navigation/MainStackNavigator.js';
import HomeScreen from './screens/HomeScreen.js';

class App extends Component {
  render() {
    return (
      // <NavigationContainer>
      //   <MainStackNavigator></MainStackNavigator>
      // </NavigationContainer>
      <HomeScreen></HomeScreen>
    );
  }
}

export default App;