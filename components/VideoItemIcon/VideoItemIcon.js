import React, {memo} from 'react';
import {Text, View} from 'react-native';
import style from '../VideoItemIconView/VideoItemIconViewStyles';

const VideoItemIcon = ({Component, name, size, color, label}) => (
  <View style={style.iconContainer}>
    <Component name={name} size={size} color={color} />
    <Text style={style.iconText}>{label}</Text>
  </View>
);

export default memo(VideoItemIcon);
