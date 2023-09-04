import React from 'react';
import {Text, View} from 'react-native';
import style from './LogoStyles';

const Logo = () => (
  <View style={style.container}>
    <Text style={{...style.logoText, ...style.boldText}}>Suitescape</Text>
    <Text style={{...style.logoText, ...style.fixText}}>PH</Text>
  </View>
);

export default Logo;
