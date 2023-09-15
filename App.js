import React from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import MainNavigation from './navigation/MainNavigation';
import BootSplash from 'react-native-bootsplash';
import {useColorScheme} from 'react-native';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

const App = () => {
  const colorScheme = useColorScheme();
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : theme}
      onReady={() => BootSplash.hide()}>
      <MainNavigation />
    </NavigationContainer>
  );
};

export default App;
