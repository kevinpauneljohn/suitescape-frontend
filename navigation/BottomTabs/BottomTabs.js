import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Routes} from '../Routes';
import Home from '../../screens/Home/Home';
import Icon from 'react-native-vector-icons/Entypo';
import Messages from '../../screens/Messages/Messages';
import {useColorScheme, View} from 'react-native';
import Search from '../../screens/Search/Search';
import Bookings from '../../screens/Bookings/Bookings';
import Profile from '../../screens/Profile/Profile';
import style from './BottomTabsStyles';
import AvatarSample from '../../components/AvatarSample/AvatarSample';

const Tabs = createBottomTabNavigator();

const tabBarStyle = {
  backgroundColor: 'white',
  minHeight: 65,
  borderTopWidth: 0,
};

const bottomTabOptions = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarActiveTintColor: 'black',
  tabBarInactiveTintColor: 'black',
  tabBarStyle,
};

const darkThemeTabOptions = {
  ...bottomTabOptions,
  tabBarActiveTintColor: 'white',
  tabBarInactiveTintColor: 'white',
  tabBarStyle: {
    ...tabBarStyle,
    backgroundColor: 'black',
  },
};

const renderTabIcons = (route, {focused, color, size}) => {
  let iconName = '';
  switch (route.name) {
    case Routes.PROFILE:
      break;
    case Routes.HOME:
      iconName = 'home';
      break;
    case Routes.MESSAGES:
      iconName = 'message';
      break;
    case Routes.SEARCH:
      iconName = 'magnifying-glass';
      break;
    case Routes.BOOKINGS:
      iconName = 'calendar';
      break;
    default:
      iconName = 'home';
  }
  return (
    <>
      <View
        style={{
          ...style.iconContainer,
          ...{marginBottom: focused ? 5 : 9},
        }}>
        {route.name === Routes.PROFILE ? (
          <AvatarSample fill={'white'} size={size} />
        ) : (
          <Icon name={iconName} color={color} size={size} />
        )}
      </View>

      {focused && (
        <View
          style={{
            ...style.underline,
            ...{backgroundColor: color},
          }}
        />
      )}
    </>
  );
};

const BottomTabs = () => {
  const colorScheme = useColorScheme();
  return (
    <Tabs.Navigator
      screenOptions={({route}) => ({
        ...(colorScheme === 'dark' ? darkThemeTabOptions : bottomTabOptions),
        tabBarIcon: props => renderTabIcons(route, props),
      })}>
      <Tabs.Screen
        name={Routes.HOME}
        component={Home}
        options={darkThemeTabOptions}
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
