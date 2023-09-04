import React from 'react';
import {Pressable} from 'react-native';
import style from './ButtonStyles';

const Button = ({children, onPress}) => (
  <Pressable
    onPress={onPress}
    style={({pressed}) => ({
      ...style.button,
      ...(pressed && {opacity: 0.7}),
    })}>
    {children}
  </Pressable>
);

export default Button;
