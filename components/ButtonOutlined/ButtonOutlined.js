import React from 'react';
import {Pressable, Text} from 'react-native';
import style from './ButtonOutlinedStyles';
import {Colors} from '../../assets/Colors';

const ButtonOutlined = ({children, onPress, containerStyle}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => ({
        ...style.button,
        ...containerStyle,
        ...(pressed && {backgroundColor: Colors.blue}),
      })}>
      {({pressed}) => (
        <Text style={{...style.text, ...(pressed && {color: 'white'})}}>
          {children}
        </Text>
      )}
    </Pressable>
  );
};

export default ButtonOutlined;
