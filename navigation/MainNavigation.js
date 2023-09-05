import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './Routes';
import Home from '../screens/Home/Home';
import Onboarding from '../screens/Onboarding/Onboarding';
import Login from '../screens/Login/Login';
import SignUp from '../screens/SignUp/SignUp';

const Stack = createStackNavigator();

const MainNavigation = () => (
  <Stack.Navigator
    initialRouteName={Routes.Onboarding}
    screenOptions={{headerShown: false}}>
    <Stack.Screen name={Routes.Onboarding} component={Onboarding} />
    <Stack.Screen name={Routes.Home} component={Home} />
    <Stack.Screen name={Routes.Login} component={Login} />
    <Stack.Screen name={Routes.SignUp} component={SignUp} />
  </Stack.Navigator>
);

export default MainNavigation;
