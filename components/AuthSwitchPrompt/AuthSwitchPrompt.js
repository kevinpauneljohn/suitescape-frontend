import React from 'react';
import {Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Link from '../Link/Link';
import {Routes} from '../../navigation/Routes';
import style from './AuthSwitchPromptStyles';
import {settingsStorage} from '../../storage/settingsStorage';

const AuthSwitchPrompt = ({register = false, onboarding = false}) => {
  const navigation = useNavigation();

  const nextScreen = () => {
    if (onboarding) {
      settingsStorage.setBool('skipOnboarding', true);
      navigation.replace(register ? Routes.SignUp : Routes.Login);
    } else {
      navigation.navigate(register ? Routes.SignUp : Routes.Login);
    }
  };

  return (
    <View style={style.container}>
      <Text
        style={{
          ...style.text,
          ...style.hint,
        }}>
        {register ? "Don't have an account?" : 'Already have an account?'}
      </Text>
      <Link onPress={nextScreen} textStyle={style.text}>
        {register ? 'Create Account' : 'Sign In'}
      </Link>
    </View>
  );
};

export default AuthSwitchPrompt;
