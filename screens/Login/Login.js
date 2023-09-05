import React, {useState} from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import style from './LoginStyles';
import {Colors} from '../../assets/Colors';
import Logo from '../../assets/svgs/logo-only.svg';
import Button from '../../components/Button/Button';
import Link from '../../components/Link/Link';
import Icon from 'react-native-vector-icons/FontAwesome';
import Google from '../../assets/svgs/icons8-google.svg';
import Facebook from '../../assets/svgs/icons8-facebook.svg';
import AuthSwitchPrompt from '../../components/AuthSwitchPrompt/AuthSwitchPrompt';
import {Routes} from '../../navigation/Routes';
import SuitescapeAPI from '../../api/SuitescapeAPI';

const LogoView = ({children}) => (
  <View
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 16,
    }}>
    <View style={{paddingVertical: 20}}>
      <Logo width={70} height={70} />
    </View>
    <Text style={{fontFamily: 'Roboto', fontSize: 25, color: 'black'}}>
      {children}
    </Text>
  </View>
);

const LineView = ({children}) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 27,
      marginVertical: 35,
    }}>
    <View style={{height: 1, flex: 1, backgroundColor: Colors.gray}} />
    <View>
      <Text
        style={{
          textAlign: 'center',
          marginHorizontal: 20,
          color: Colors.gray,
          fontFamily: 'Roboto',
          fontSize: 17,
        }}>
        {children}
      </Text>
    </View>
    <View style={{height: 1, flex: 1, backgroundColor: Colors.gray}} />
  </View>
);

const SocialButton = ({type}) => {
  const SocialTypes = {
    phone: 'phone',
    facebook: 'facebook',
    google: 'google',
  };

  const ContinueWithPhone = (
    <>
      <Icon name={'mobile-phone'} size={30} color={'gray'} />
      <Text
        style={{
          marginLeft: 15,
          color: 'gray',
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        }}>
        Continue with Phone
      </Text>
    </>
  );

  const ContinueWithFacebook = (
    <>
      <Facebook width={30} height={30} />
      <Text
        style={{
          marginLeft: 10,
          color: 'gray',
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        }}>
        Continue with Facebook
      </Text>
    </>
  );

  const ContinueWithGoogle = (
    <>
      <Google width={30} height={30} />
      <Text
        style={{
          marginLeft: 10,
          color: 'gray',
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        }}>
        Continue with Google
      </Text>
    </>
  );

  return (
    <Pressable
      style={{
        marginHorizontal: 30,
        paddingVertical: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: Colors.gray,
        borderRadius: 10,
      }}>
      {({pressed}) => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            ...(pressed && {opacity: 0.5}),
          }}>
          {type === SocialTypes.phone && ContinueWithPhone}
          {type === SocialTypes.facebook && ContinueWithFacebook}
          {type === SocialTypes.google && ContinueWithGoogle}
        </View>
      )}
    </Pressable>
  );
};

const FormInput = ({password = false, ...props}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: Colors.gray,
        borderRadius: 10,
        marginHorizontal: 28,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <TextInput
        {...props}
        secureTextEntry={password && !showPassword}
        style={{
          paddingVertical: password ? 20 : 16,
          paddingHorizontal: 25,
          flex: 1,
        }}
      />
      {password && (
        <Pressable
          onPress={() => setShowPassword(!showPassword)}
          style={{justifyContent: 'center', paddingHorizontal: 20}}>
          {showPassword ? (
            <Icon name={'eye-slash'} size={20} color={'gray'} />
          ) : (
            <Icon name={'eye'} size={20} color={'gray'} />
          )}
        </Pressable>
      )}
    </View>
  );
};

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
        <LogoView>Login to your account</LogoView>
        <FormInput
          value={email}
          onChangeText={setEmail}
          placeholder={'Email'}
          keyboardType={'email-address'}
          textContentType={'emailAddress'}
          autoCapitalize={'none'}
        />
        {errors.email && (
          <Text
            style={{
              color: 'red',
              paddingTop: 3,
              paddingBottom: 5,
              marginLeft: 30,
            }}>
            {errors.email}
          </Text>
        )}
        <FormInput
          value={password}
          onChangeText={setPassword}
          placeholder={'Password'}
          textContentType={'none'}
          password={true}
        />
        {errors.password && (
          <Text
            style={{
              color: 'red',
              paddingTop: 3,
              paddingBottom: 5,
              marginLeft: 30,
            }}>
            {errors.password}
          </Text>
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
