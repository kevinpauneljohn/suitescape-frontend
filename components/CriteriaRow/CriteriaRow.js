import React, {memo} from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import style from './CriteriaRowStyles';

const CriteriaRow = ({met, text}) => {
  return (
    <View style={style.container}>
      <Icon
        name={met ? 'checkmark' : 'alert-circle'}
        size={15}
        color={met ? 'green' : 'red'}
      />
      <View style={style.textContainer}>
        <Text
          style={{
            ...style.text,
            ...{color: met ? 'green' : 'red'},
          }}>
          {text}
        </Text>
      </View>
    </View>
  );
};

export default memo(CriteriaRow);
