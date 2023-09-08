import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigation from './navigation/MainNavigation';
import BootSplash from 'react-native-bootsplash';
import {PaperProvider} from 'react-native-paper';

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer onReady={() => BootSplash.hide()}>
        <MainNavigation />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
