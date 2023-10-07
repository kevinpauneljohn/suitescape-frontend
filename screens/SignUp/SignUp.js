import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import globalStyles from '../../assets/styles/globalStyles';
import HeaderText from '../../components/HeaderText/HeaderText';
import LogoView from '../../components/LogoView/LogoView';
import FormInput from '../../components/FormInput/FormInput';
import ButtonLarge from '../../components/ButtonLarge/ButtonLarge';
import PasswordCheckerView from '../../components/PasswordCheckerView/PasswordCheckerView';
import AgreementBox from '../../components/AgreementBox/AgreementBox';
import LineView from '../../components/LineView/LineView';
import ButtonSocialLogin from '../../components/ButtonSocialLogin/ButtonSocialLogin';
import AuthSwitchPrompt from '../../components/AuthSwitchPrompt/AuthSwitchPrompt';
import {Routes} from '../../navigation/Routes';
import SuitescapeAPI from '../../services/SuitescapeAPI';
import {handleApiError, handleApiResponse} from '../../utilities/apiHelpers';

const SignUp = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState({});

  const lastNameRef = useRef(null);
  const birthdayRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setFirstName('');
        setLastName('');
        setBirthday('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setIsPasswordValid(false);
        setChecked(false);
        setErrors({});
      };
    }, []),
  );

  useEffect(() => {
    setErrors(prevErrors => ({
      firstname: firstName ? '' : prevErrors.firstname,
      lastname: lastName ? '' : prevErrors.lastname,
      date_of_birth: birthday ? '' : prevErrors.date_of_birth,
      email: email ? '' : prevErrors.email,
      password: password ? '' : prevErrors.password,
    }));
  }, [birthday, email, firstName, lastName, password]);

  const register = async () => {
    try {
      const response = await SuitescapeAPI.post('/register', {
        firstname: firstName,
        lastname: lastName,
        date_of_birth: birthday,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
      });
      handleApiResponse({
        response,
        onError: e => setErrors(e.errors),
        onSuccess: () => {
          Alert.alert('Signup successful', 'You can now login your account.');
          navigation.replace(Routes.LOGIN);
        },
      });
    } catch (err) {
      handleApiError({error: err, handleErrors: e => setErrors(e.errors)});
    }
  };

  const handleBirthdayConfirm = birthdate => {
    const today = new Date();
    const eighteenthBirthday = new Date(birthdate);
    eighteenthBirthday.setFullYear(birthdate.getFullYear() + 18);

    if (eighteenthBirthday > today) {
      Alert.alert('You must be 18 years old or above to register.');
      return false;
    }
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}>
        <ScrollView bounces={false}>
          <LogoView />
          <HeaderText>Create Account</HeaderText>
          <FormInput
            value={firstName}
            onChangeText={setFirstName}
            placeholder={'First Name'}
            textContentType={'givenName'}
            autoCapitalize={'words'}
            autoCorrect={false}
            errorMessage={errors?.firstname}
            returnKeyType={'next'}
            onSubmitEditing={() => {
              lastNameRef.current.focus();
            }}
            blurOnSubmit={false}
          />
          <FormInput
            value={lastName}
            onChangeText={setLastName}
            placeholder={'Last Name'}
            textContentType={'familyName'}
            autoCapitalize={'words'}
            autoCorrect={false}
            errorMessage={errors?.lastname}
            returnKeyType={'next'}
            onSubmitEditing={() => {
              birthdayRef.current.focus();
            }}
            blurOnSubmit={false}
            ref={lastNameRef}
          />
          <FormInput
            type={'date'}
            value={birthday}
            onChangeText={setBirthday}
            onDateConfirm={handleBirthdayConfirm}
            placeholder={'Birthday (YYYY-MM-DD)'}
            textContentType={'none'}
            keyboardType={'phone-pad'}
            errorMessage={errors?.date_of_birth}
            returnKeyType={'next'}
            onSubmitEditing={() => {
              emailRef.current.focus();
            }}
            blurOnSubmit={false}
            ref={birthdayRef}
          />
          <FormInput
            value={email}
            onChangeText={setEmail}
            placeholder={'Email Address'}
            keyboardType={'email-address'}
            textContentType={'emailAddress'}
            autoCapitalize={'none'}
            autoCorrect={false}
            errorMessage={errors?.email}
            returnKeyType={'next'}
            onSubmitEditing={() => {
              passwordRef.current.focus();
            }}
            blurOnSubmit={false}
            ref={emailRef}
          />
          <FormInput
            type={'password'}
            value={password}
            onChangeText={setPassword}
            placeholder={'Password'}
            textContentType={'password'}
            errorMessage={errors?.password && null}
            returnKeyType={'next'}
            onSubmitEditing={() => {
              confirmPasswordRef.current.focus();
            }}
            blurOnSubmit={false}
            ref={passwordRef}
          />
          <FormInput
            type={'password'}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder={'Confirm Password'}
            textContentType={'password'}
            errorMessage={errors?.password}
            onSubmitEditing={() => checked && isPasswordValid && register()}
            ref={confirmPasswordRef}
          />
          {password.length > 0 && (
            <PasswordCheckerView
              password={password}
              setIsPasswordValid={setIsPasswordValid}
            />
          )}
          <AgreementBox checked={checked} setChecked={setChecked} />
          <View style={globalStyles.registrationButtonContainer}>
            <ButtonLarge
              disabled={!checked || !isPasswordValid}
              onPress={() => register()}>
              Sign Up
            </ButtonLarge>
          </View>
          <LineView>Or</LineView>
          <ButtonSocialLogin type={'facebook'} />
          <ButtonSocialLogin type={'google'} />
          <AuthSwitchPrompt />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
