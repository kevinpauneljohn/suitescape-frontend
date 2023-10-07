import React from 'react';
import {Pressable, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import style from './ButtonBackStyles';
import {pressedOpacity} from '../../assets/styles/globalStyles';

const ButtonBack = ({onPress, color = 'black'}) => (
  <Pressable onPress={onPress}>
    {({pressed}) => (
      <View
        style={{
          ...style.backButton,
          ...pressedOpacity(pressed, 0.7),
        }}>
        <Icon name={'chevron-back'} size={30} color={color} />
      </View>
    )}
  </Pressable>
);

export default ButtonBack;
