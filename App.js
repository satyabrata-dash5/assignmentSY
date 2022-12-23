import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/Components/RootStack';
import { Provider } from 'react-redux';
import { mystore } from './src/redux/store/store';


const App = () => {
  return (
    <Provider store={mystore}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Provider>
  )
};

export default App;
