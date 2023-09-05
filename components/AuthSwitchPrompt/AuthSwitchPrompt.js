import React from 'react';
import {Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Link from '../Link/Link';
import {Routes} from '../../navigation/Routes';
import style from './AuthSwitchPromptStyles';

const AuthSwitchPrompt = ({register = false, onboarding = false}) => {
  const navigation = useNavigation();

  const nextScreen = () => {
    onboarding
      ? navigation.replace(register ? Routes.SignUp : Routes.Login)
      : navigation.navigate(register ? Routes.SignUp : Routes.Login);
  };

  return (
    <View style={style.container}>
      <Text
        style={{
          ...style.hintText,
          ...(onboarding && {color: 'black'}),
        }}>
        {register ? "Don't have an account?" : 'Already have an account?'}
      </Text>
      <Link onPress={nextScreen}>{register ? 'Sign Up' : 'Sign In'}</Link>
    </View>
  );
};

export default AuthSwitchPrompt;
