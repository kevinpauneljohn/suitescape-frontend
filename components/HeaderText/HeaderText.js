import React from 'react';
import {Text, View} from 'react-native';
import style from './HeaderTextStyles';
import {useTheme} from '@react-navigation/native';

const HeaderText = ({children, textAlign = 'center'}) => {
  const {colors} = useTheme();

  return (
    <View style={style.container}>
      <Text
        style={{
          textAlign,
          color: colors.text,
          ...style.text,
        }}>
        {children}
      </Text>
    </View>
  );
};

export default HeaderText;
