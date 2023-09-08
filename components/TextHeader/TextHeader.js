import React from 'react';
import {Text, View} from 'react-native';
import style from './TextHeaderStyles';

const TextHeader = ({children, textAlign = 'center'}) => {
  return (
    <View style={style.container}>
      <Text
        style={{
          textAlign,
          ...style.text,
        }}>
        {children}
      </Text>
    </View>
  );
};

export default TextHeader;
