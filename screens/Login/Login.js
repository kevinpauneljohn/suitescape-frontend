import React, {useCallback, useEffect, useRef, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import style from './LoginStyles';
import globalStyles from '../../assets/styles/globalStyles';
import HeaderText from '../../components/HeaderText/HeaderText';
import LogoView from '../../components/LogoView/LogoView';
import FormInput from '../../components/FormInput/FormInput';
import ButtonLink from '../../components/ButtonLink/ButtonLink';
import ButtonLarge from '../../components/ButtonLarge/ButtonLarge';
import LineView from '../../components/LineView/LineView';
import ButtonSocialLogin from '../../components/ButtonSocialLogin/ButtonSocialLogin';
import AuthSwitchPrompt from '../../components/AuthSwitchPrompt/AuthSwitchPrompt';
import {Routes} from '../../navigation/Routes';
import SuitescapeAPI from '../../services/SuitescapeAPI';
import {handleApiError, handleApiResponse} from '../../utilities/apiHelpers';

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
      handleApiResponse({
        response,
        onError: e => setErrors(e.errors),
        onSuccess: () => navigation.replace(Routes.BOTTOM_TABS),
      });
    } catch (err) {
      handleApiError({error: err, handleErrors: e => setErrors(e.errors)});
    }
  };

  return (
    <SafeAreaView>
      <ScrollView bounces={false}>
        <LogoView />
        <HeaderText>Log in to your Account</HeaderText>
        <FormInput
          value={email}
          onChangeText={setEmail}
          placeholder={'Email Address'}
          keyboardType={'email-address'}
          textContentType={'emailAddress'}
          autoComplete={'email'}
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
          <ButtonLink
            onPress={() => console.log('Forgot Password')}
            textStyle={style.forgotPasswordText}>
            Forgot Password?
          </ButtonLink>
        </View>
        <View style={globalStyles.registrationButtonContainer}>
          <ButtonLarge onPress={() => login()}>Login</ButtonLarge>
        </View>
        <LineView>Or</LineView>
        <ButtonSocialLogin type={'phone'} />
        <ButtonSocialLogin type={'facebook'} />
        <ButtonSocialLogin type={'google'} />
        <AuthSwitchPrompt register={true} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
