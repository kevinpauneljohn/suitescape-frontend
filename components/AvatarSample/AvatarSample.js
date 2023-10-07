import React, {memo} from 'react';
import {View} from 'react-native';
import style from './AvatarSampleStyles';

const AvatarSample = ({size = 40, fill = 'transparent'}) => (
  <View
    style={{
      ...style.avatarContainer,
      ...(fill && {backgroundColor: fill}),
      ...(size && {width: size, height: size}),
    }}
  />
);

export default memo(AvatarSample);
