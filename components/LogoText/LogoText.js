import React from 'react';
import {Text, View} from 'react-native';
import Logo from '../../assets/svgs/logo-only.svg';
import style from './LogoTextStyles';

const LogoText = ({children}) => (
  <View style={style.container}>
    <View style={style.logoContainer}>
      <Logo width={70} height={70} />
    </View>
    <Text style={style.text}>{children}</Text>
  </View>
);

export default LogoText;
