import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Routes} from './Routes';
import {DefaultTheme} from '@react-navigation/native';
import Onboarding from '../screens/Onboarding/Onboarding';
import Login from '../screens/Login/Login';
import SignUp from '../screens/SignUp/SignUp';
import BottomTabs from './BottomTabs/BottomTabs';
import ListingDetails from '../screens/ListingDetails/ListingDetails';
import CheckAvailability from '../screens/CheckAvailability/CheckAvailability';

const Stack = createNativeStackNavigator();

const MainNavigation = () => (
  <Stack.Navigator
    initialRouteName={Routes.ONBOARDING}
    screenOptions={{headerShown: false}}>
    <Stack.Screen name={Routes.ONBOARDING} component={Onboarding} />

    <Stack.Group screenOptions={{animation: 'slide_from_bottom'}}>
      <Stack.Screen name={Routes.LOGIN} component={Login} />
      <Stack.Screen name={Routes.SIGNUP} component={SignUp} />
    </Stack.Group>

    <Stack.Screen name={Routes.BOTTOM_TABS} component={BottomTabs} />

    <Stack.Group
      screenOptions={{
        contentStyle: {backgroundColor: DefaultTheme.colors.background},
      }}>
      <Stack.Screen
        name={Routes.LISTING_DETAILS}
        component={ListingDetails}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name={Routes.CHECK_AVAILABILITY}
        component={CheckAvailability}
      />
    </Stack.Group>
  </Stack.Navigator>
);

export default MainNavigation;
