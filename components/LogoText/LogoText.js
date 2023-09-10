import React, {memo} from 'react';
import {Text, View} from 'react-native';
import style from './LogoTextStyles';

const LogoText = () => (
  <View style={style.container}>
    <Text style={{...style.logoText, ...style.bold}}>Suitescape</Text>
    <Text style={style.logoText}>PH</Text>
  </View>
);

export default memo(LogoText);
