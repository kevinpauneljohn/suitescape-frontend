import React from 'react';
import {Pressable, Text} from 'react-native';
import style from './ButtonStyles';

const Button = ({children, onPress}) => (
  <Pressable
    onPress={onPress}
    style={({pressed}) => ({
      ...style.button,
      ...(pressed && {opacity: 0.7}),
    })}>
    <Text style={style.buttonText}>{children}</Text>
  </Pressable>
);

export default Button;
