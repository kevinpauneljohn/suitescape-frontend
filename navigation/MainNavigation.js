import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Routes} from './Routes';
import Onboarding from '../screens/Onboarding/Onboarding';
import Login from '../screens/Login/Login';
import SignUp from '../screens/SignUp/SignUp';
import BottomTabs from './BottomTabs';

const Stack = createNativeStackNavigator();

const MainNavigation = () => (
  <Stack.Navigator
    initialRouteName={Routes.Onboarding}
    screenOptions={{headerShown: false}}>
    <Stack.Screen name={Routes.Onboarding} component={Onboarding} />
    <Stack.Screen name={Routes.Login} component={Login} />
    <Stack.Screen name={Routes.SignUp} component={SignUp} />
    <Stack.Screen name={Routes.BottomTabs} component={BottomTabs} />
  </Stack.Navigator>
);

export default MainNavigation;
