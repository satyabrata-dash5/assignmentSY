import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/Components/RootStack';


const App = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  )
};

export default App;
