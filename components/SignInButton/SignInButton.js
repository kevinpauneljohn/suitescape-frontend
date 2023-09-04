import React from 'react';
import {Pressable, Text, View} from 'react-native';
import style from './SignInButtonStyles';
import {Routes} from '../../navigation/Routes';

const SignInButton = ({navigation}) => (
  <Pressable onPress={() => navigation.replace(Routes.Login)}>
    {({pressed}) => (
      <View
        style={{
          ...style.signInButton,
          ...(pressed && {opacity: 0.5}),
        }}>
        <Text style={style.skipButtonText}>Sign In</Text>
      </View>
    )}
  </Pressable>
);

export default SignInButton;
