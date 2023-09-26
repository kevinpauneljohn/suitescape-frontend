import React from 'react';
import {Pressable, Text} from 'react-native';
import style from './ButtonStyles';
import {
  disabledOpacity,
  pressedOpacity,
} from '../../assets/styles/globalStyles';

const Button = ({children, onPress, disabled, ...props}) => (
  <Pressable
    {...props}
    onPress={onPress}
    disabled={disabled}
    style={({pressed}) => ({
      ...style.button,
      ...pressedOpacity(pressed, 0.7),
      ...disabledOpacity(disabled),
    })}>
    <Text style={style.buttonText}>{children}</Text>
  </Pressable>
);

export default Button;
