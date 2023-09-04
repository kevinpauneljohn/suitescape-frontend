import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './Routes';
import Home from '../screens/Home';
import Onboarding from '../screens/Onboarding';

const Stack = createStackNavigator();

const MainNavigation = () => (
  <Stack.Navigator
    initialRouteName={Routes.Onboarding}
    screenOptions={{headerShown: false}}>
    <Stack.Screen name={Routes.Home} component={Home} />
    <Stack.Screen name={Routes.Onboarding} component={Onboarding} />
  </Stack.Navigator>
);

export default MainNavigation;
