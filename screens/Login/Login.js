import React, {useState} from 'react';
import {Alert, SafeAreaView, ScrollView, View} from 'react-native';
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
      <ScrollView stickyHeaderIndices={[1]} bounces={false}>
        <LogoView />
        <TextHeader>Login to your account</TextHeader>
        <FormInput
          value={email}
          onChangeText={setEmail}
          placeholder={'Email'}
          keyboardType={'email-address'}
          textContentType={'emailAddress'}
          autoCapitalize={'none'}
          errorMessage={errors.email}
        />
        <FormInput
          value={password}
          onChangeText={setPassword}
          placeholder={'Password'}
          textContentType={'none'}
          password={true}
          errorMessage={errors.password}
        />
        <View style={style.forgotPasswordButtonContainer}>
          <Link>Forgot Password?</Link>
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
