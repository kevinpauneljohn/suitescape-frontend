import React from 'react';
import {Pressable, Text, View} from 'react-native';
import style from './SkipButtonStyles';
import {Colors} from '../../assets/Colors';

const SkipButton = ({onPress}) => (
  <Pressable onPress={onPress}>
    {({pressed}) => (
      <View
        style={{
          ...style.skipButton,
          ...(pressed && {backgroundColor: Colors.blue}),
        }}>
        <Text
          style={{
            ...style.skipButtonText,
            ...(pressed && {color: 'white'}),
          }}>
          Skip
        </Text>
      </View>
    )}
  </Pressable>
);

export default SkipButton;
