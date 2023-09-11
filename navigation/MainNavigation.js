import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Routes} from './Routes';
import Home from '../screens/Home/Home';
import Onboarding from '../screens/Onboarding/Onboarding';
import Login from '../screens/Login/Login';
import SignUp from '../screens/SignUp/SignUp';

const Stack = createNativeStackNavigator();

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
