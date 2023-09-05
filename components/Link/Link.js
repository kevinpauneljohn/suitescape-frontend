import React from 'react';
import {Pressable, Text} from 'react-native';
import style from './LinkStyles';

const Link = ({children, onPress}) => (
  <Pressable onPress={onPress}>
    {({pressed}) => (
      <Text
        style={{
          ...style.link,
          ...(pressed && {opacity: 0.5}),
        }}>
        {children}
      </Text>
    )}
  </Pressable>
);

export default Link;
