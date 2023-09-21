import React, {memo} from 'react';
import {Pressable, Text} from 'react-native';
import {pressedOpacity} from '../../assets/styles/globalStyles';
import style from './VideoItemIconStyles';

const VideoItemIcon = ({
  IconComponent,
  onPress,
  label,
  name,
  color = 'white',
  size = 30,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => ({
        ...style.container,
        ...pressedOpacity(pressed, 0.8),
      })}>
      <IconComponent name={name} color={color} size={size} />
      <Text style={style.text}>{label}</Text>
    </Pressable>
  );
};

export default memo(VideoItemIcon);
