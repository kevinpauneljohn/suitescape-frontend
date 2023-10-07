import React from 'react';
import {pressedOpacity} from '../../assets/styles/globalStyles';
import {Pressable, Text} from 'react-native';
import style from './ButtonIconRowStyles';

const ButtonIconRow = ({
  children,
  onPress,
  textStyle,
  renderIcon,
  reverse = false,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => ({
        ...style.button,
        ...{flexDirection: reverse ? 'row-reverse' : 'row'},
        ...pressedOpacity(pressed),
      })}>
      {renderIcon()}
      <Text
        style={{
          ...(reverse ? {marginRight: 10} : {marginLeft: 10}),
          ...textStyle,
        }}>
        {children}
      </Text>
    </Pressable>
  );
};

export default ButtonIconRow;
