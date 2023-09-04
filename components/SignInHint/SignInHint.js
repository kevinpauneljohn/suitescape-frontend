import React from 'react';
import {Pressable, Text, View} from 'react-native';
import style from './SignInHintStyles';
import {Routes} from '../../navigation/Routes';

const SignInHint = ({navigation, light = false}) => (
  <View style={style.container}>
    <Text style={{...style.text, ...(light && {color: 'gray'})}}>
      Already have an account?
    </Text>
    <Pressable onPress={() => navigation.replace(Routes.Login)}>
      <Text style={{...style.text, ...style.link}}>Sign in</Text>
    </Pressable>
  </View>
);

export default SignInHint;
