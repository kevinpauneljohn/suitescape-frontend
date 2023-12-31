import React from 'react';
import {Pressable, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../assets/Colors';
import style from './BackButtonStyles';
import {pressedOpacity} from '../../assets/styles/globalStyles';

const BackButton = ({onPress}) => (
  <Pressable onPress={onPress}>
    {({pressed}) => (
      <View
        style={{
          ...style.backButton,
          ...pressedOpacity(pressed, 0.7),
        }}>
        <Icon name={'chevron-back'} size={30} color={Colors.blue} />
      </View>
    )}
  </Pressable>
);

export default BackButton;
