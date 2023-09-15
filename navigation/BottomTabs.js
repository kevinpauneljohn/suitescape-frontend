import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Routes} from './Routes';
import Home from '../screens/Home/Home';
import {Colors} from '../assets/Colors';
import Icon from 'react-native-vector-icons/Entypo';
import Messages from '../screens/Messages/Messages';

const Tabs = createBottomTabNavigator();

const renderTabIcons = (color, size, route) => {
  let iconName;
  switch (route.name) {
    case Routes.HOME:
      iconName = 'home';
      break;
    case Routes.MESSAGES:
      iconName = 'chat';
      break;
    default:
      iconName = 'home';
  }
  return <Icon name={iconName} color={color} size={size} />;
};

const BottomTabs = () => {
  return (
    <Tabs.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.blue,
        tabBarInactiveTintColor: 'black',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0,
        },
        tabBarIcon: ({color, size}) => renderTabIcons(color, size, route),
      })}>
      <Tabs.Screen name={Routes.HOME} component={Home} />
      <Tabs.Screen name={Routes.MESSAGES} component={Messages} />
    </Tabs.Navigator>
  );
};

export default BottomTabs;
