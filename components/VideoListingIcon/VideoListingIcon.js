import React, {memo} from 'react';
import {Pressable} from 'react-native';
import {pressedOpacity} from '../../assets/styles/globalStyles';
import style from './VideoListingIconStyles';

const VideoListingIcon = ({
  IconComponent,
  onPress,
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
    </Pressable>
  );
};

export default memo(VideoListingIcon);
