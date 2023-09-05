import React, {useState} from 'react';
import {Alert, SafeAreaView, ScrollView, Text, View} from 'react-native';
import style from './LoginStyles';
import Button from '../../components/Button/Button';
import Link from '../../components/Link/Link';
import AuthSwitchPrompt from '../../components/AuthSwitchPrompt/AuthSwitchPrompt';
import {Routes} from '../../navigation/Routes';
import FormInput from '../../components/FormInput/FormInput';
import SocialButton from '../../components/SocialButton/SocialButton';
import LineView from '../../components/LineView/LineView';
import LogoText from '../../components/LogoText/LogoText';
import SuitescapeAPI from '../../api/SuitescapeAPI';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const login = async () => {
    try {
      const response = await SuitescapeAPI.post('/login', {email, password});
      if (response.data.errors) {
        Alert.alert('Error', response.data.message);
        setErrors(response.data.errors);
        return;
      }
      Alert.alert('Success', response.data.message);
      navigation.replace(Routes.Home);
    } catch (err) {
      if (err.response) {
        setErrors(err.response.data.errors);
      } else {
        Alert.alert('Error', err.message);
        console.log(err.request);
      }
    }
  };

  return (
    <SafeAreaView>
      <ScrollView bounces={false}>
        <LogoText>Login to your account</LogoText>
        <FormInput
          value={email}
          onChangeText={setEmail}
          placeholder={'Email'}
          keyboardType={'email-address'}
          textContentType={'emailAddress'}
          autoCapitalize={'none'}
        />
        {errors.email && <Text style={style.errorText}>{errors.email}</Text>}
        <FormInput
          value={password}
          onChangeText={setPassword}
          placeholder={'Password'}
          textContentType={'none'}
          password={true}
        />
        {errors.password && (
          <Text style={style.errorText}>{errors.password}</Text>
        )}
        <View style={style.forgotPasswordButtonContainer}>
          <Link>Forgot Password?</Link>
        </View>
        <View style={style.loginButtonContainer}>
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
