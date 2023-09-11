import React, {useCallback, useEffect, useRef, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import style from './LoginStyles';
import globalStyles from '../../assets/styles/globalStyles';
import TextHeader from '../../components/TextHeader/TextHeader';
import LogoView from '../../components/LogoView/LogoView';
import FormInput from '../../components/FormInput/FormInput';
import Link from '../../components/Link/Link';
import Button from '../../components/Button/Button';
import LineView from '../../components/LineView/LineView';
import SocialButton from '../../components/SocialButton/SocialButton';
import AuthSwitchPrompt from '../../components/AuthSwitchPrompt/AuthSwitchPrompt';
import {Routes} from '../../navigation/Routes';
import SuitescapeAPI from '../../services/SuitescapeAPI';
import {handleApiError, handleApiResponse} from '../../utilities/apiHelpers';
import {useFocusEffect} from '@react-navigation/native';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const passwordRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setEmail('');
        setPassword('');
        setErrors({});
      };
    }, []),
  );

  useEffect(() => {
    setErrors(prevErrors => ({
      email: email ? '' : prevErrors.email,
      password: password ? '' : prevErrors.password,
    }));
  }, [email, password]);

  const login = async () => {
    try {
      const response = await SuitescapeAPI.post('/login', {email, password});
      handleApiResponse(response, setErrors, () =>
        navigation.replace(Routes.Home),
      );
    } catch (err) {
      handleApiError(err, setErrors);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView bounces={false}>
        <LogoView />
        <TextHeader>Log in to your Account</TextHeader>
        <FormInput
          value={email}
          onChangeText={setEmail}
          placeholder={'Email'}
          keyboardType={'email-address'}
          textContentType={'emailAddress'}
          autoCapitalize={'none'}
          errorMessage={errors?.email}
          returnKeyType={'next'}
          onSubmitEditing={() => {
            passwordRef.current.focus();
          }}
          blurOnSubmit={false}
        />
        <FormInput
          type={'password'}
          value={password}
          onChangeText={setPassword}
          placeholder={'Password'}
          textContentType={'none'}
          errorMessage={errors?.password}
          onSubmitEditing={() => login()}
          ref={passwordRef}
        />
        <View style={style.forgotPasswordButtonContainer}>
          <Link
            onPress={() => console.log('Forgot Password')}
            textStyle={style.forgotPasswordText}>
            Forgot Password?
          </Link>
        </View>
        <View style={globalStyles.registrationButtonContainer}>
          <Button onPress={() => login()}>Login</Button>
        </View>
        <LineView>Or</LineView>
        <SocialButton type={'phone'} />
        <SocialButton type={'facebook'} />
        <SocialButton type={'google'} />
        <AuthSwitchPrompt register={true} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
