import React from 'react';
import {Pressable} from 'react-native';
import {Badge} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import style from './NotificationBadgeStyles';
import {pressedOpacity} from '../../assets/styles/globalStyles';

const NotificationBadge = ({onPress, size}) => {
  const theme = {
    colors: {
      error: 'black',
      onError: 'white',
    },
  };

  return (
    <Pressable onPress={onPress} style={({pressed}) => pressedOpacity(pressed)}>
      {size > 1 && (
        <Badge size={15} theme={theme} style={style.badge}>
          {size}
        </Badge>
      )}
      <Icon name={'notifications'} size={30} color={'white'} />
    </Pressable>
  );
};

export default NotificationBadge;
