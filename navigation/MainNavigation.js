import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Routes} from './Routes';
import Onboarding from '../screens/Onboarding/Onboarding';
import Login from '../screens/Login/Login';
import SignUp from '../screens/SignUp/SignUp';
import BottomTabs from './BottomTabs/BottomTabs';

const Stack = createNativeStackNavigator();

const MainNavigation = () => (
  <Stack.Navigator
    initialRouteName={Routes.ONBOARDING}
    screenOptions={{headerShown: false}}>
    <Stack.Screen name={Routes.ONBOARDING} component={Onboarding} />
    <Stack.Screen name={Routes.LOGIN} component={Login} />
    <Stack.Screen name={Routes.SIGNUP} component={SignUp} />
    <Stack.Screen name={Routes.BOTTOM_TABS} component={BottomTabs} />
  </Stack.Navigator>
);

export default MainNavigation;
