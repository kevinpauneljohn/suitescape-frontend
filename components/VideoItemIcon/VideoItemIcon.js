import React, {memo} from 'react';
import {Pressable, Text, View} from 'react-native';
import style from '../VideoItemIconView/VideoItemIconViewStyles';

const VideoItemIcon = ({
  IconComponent,
  onPress,
  label,
  name,
  color = 'white',
  size = 30,
}) => {
  return (
    <Pressable onPress={onPress}>
      <View style={style.iconContainer}>
        <IconComponent name={name} color={color} size={size} />
        <Text style={style.iconText}>{label}</Text>
      </View>
    </Pressable>
  );
};

export default memo(VideoItemIcon);
