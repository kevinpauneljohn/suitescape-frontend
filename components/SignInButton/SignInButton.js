import React from 'react';
import {Pressable, Text, View} from 'react-native';
import style from './SignInButtonStyles';

const SignInButton = () => (
  <Pressable>
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
