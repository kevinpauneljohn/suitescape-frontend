import React from 'react';
import {View} from 'react-native';
import style from './HeaderIconStyles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const HeaderIcon = ({children, right = false}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        top: insets.top + 25,
        ...(right && {right: 0}),
        ...style.headerIconContainer,
      }}>
      {children}
    </View>
  );
};

export default HeaderIcon;
