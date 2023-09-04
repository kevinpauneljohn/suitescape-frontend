import React from 'react';
import {Text, View} from 'react-native';
import style from './SignInHintStyles';

const SignInHint = ({light = false}) => (
  <View style={style.container}>
    <Text style={{...style.text, ...(light && {color: 'gray'})}}>
      Already have an account?
    </Text>
    <Text style={{...style.text, ...style.link}}>Sign in</Text>
  </View>
);

export default SignInHint;
