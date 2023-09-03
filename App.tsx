import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigation from './navigation/MainNavigation';
import BootSplash from 'react-native-bootsplash';

const App = () => {
  return (
    <NavigationContainer onReady={() => BootSplash.hide()}>
      <MainNavigation />
    </NavigationContainer>
  );
};

export default App;
