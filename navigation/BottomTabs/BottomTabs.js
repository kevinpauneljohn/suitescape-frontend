import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Routes} from '../Routes';
import Home from '../../screens/Home/Home';
import Icon from 'react-native-vector-icons/Entypo';
import Messages from '../../screens/Messages/Messages';
import {View} from 'react-native';
import Search from '../../screens/Search/Search';
import Bookings from '../../screens/Bookings/Bookings';
import Profile from '../../screens/Profile/Profile';
import style from './BottomTabsStyles';

const Tabs = createBottomTabNavigator();

const tabBarStyle = {
  backgroundColor: 'white',
  minHeight: 60,
  borderTopWidth: 0,
};

const bottomTabOptions = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarActiveTintColor: 'black',
  tabBarInactiveTintColor: 'black',
  tabBarStyle,
};

const renderTabIcons = (route, {focused, color, size}) => {
  let iconName;
  switch (route.name) {
    case Routes.MESSAGES:
      iconName = 'message';
      break;
    case Routes.SEARCH:
      iconName = 'magnifying-glass';
      break;
    case Routes.BOOKINGS:
      iconName = 'calendar';
      break;
    case Routes.PROFILE:
      iconName = 'circle';
      break;
    default:
      iconName = 'home';
  }
  return (
    <View>
      <View
        style={{
          ...style.iconContainer,
          ...{marginBottom: focused ? 5 : 9},
        }}>
        <Icon name={iconName} color={color} size={size} />
      </View>
      {focused && (
        <View
          style={{
            ...style.underline,
            ...{backgroundColor: color},
          }}
        />
      )}
    </View>
  );
};

const BottomTabs = () => {
  return (
    <Tabs.Navigator
      screenOptions={({route}) => ({
        ...bottomTabOptions,
        tabBarIcon: props => renderTabIcons(route, props),
      })}>
      <Tabs.Screen
        name={Routes.HOME}
        component={Home}
        options={{
          ...bottomTabOptions,
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'white',
          tabBarStyle: {
            ...tabBarStyle,
            backgroundColor: 'black',
          },
        }}
      />
      {/* Temporary tab group for showing header */}
      <Tabs.Group screenOptions={{headerShown: true}}>
        <Tabs.Screen name={Routes.MESSAGES} component={Messages} />
        <Tabs.Screen name={Routes.SEARCH} component={Search} />
        <Tabs.Screen name={Routes.BOOKINGS} component={Bookings} />
        <Tabs.Screen name={Routes.PROFILE} component={Profile} />
      </Tabs.Group>
    </Tabs.Navigator>
  );
};

export default BottomTabs;
