import React from 'react';
import {Pressable, Text} from 'react-native';
import style from './ButtonStyles';

const Button = ({children, onPress, disabled, ...props}) => (
  <Pressable
    {...props}
    onPress={onPress}
    disabled={disabled}
    style={({pressed}) => ({
      ...style.button,
      ...(pressed && {opacity: 0.7}),
      ...(disabled && {opacity: 0.6}),
    })}>
    <Text style={style.buttonText}>{children}</Text>
  </Pressable>
);

export default Button;
