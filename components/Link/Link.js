import React from 'react';
import {Pressable, Text} from 'react-native';
import style from './LinkStyles';
import {pressedOpacity} from '../../assets/styles/globalStyles';

const Link = ({children, onPress, textStyle, type = 'button'}) =>
  type === 'button' ? (
    <Pressable onPress={onPress}>
      {({pressed}) => (
        <Text
          style={{
            ...style.link,
            ...textStyle,
            ...pressedOpacity(pressed),
          }}>
          {children}
        </Text>
      )}
    </Pressable>
  ) : type === 'text' ? (
    <Text onPress={onPress} style={{...style.link, ...textStyle}}>
      {children}
    </Text>
  ) : null;

export default Link;
