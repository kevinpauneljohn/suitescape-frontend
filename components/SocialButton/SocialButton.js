import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Pressable, Text, View} from 'react-native';
import Facebook from '../../assets/svgs/icons8-facebook.svg';
import Google from '../../assets/svgs/icons8-google.svg';
import {Colors} from '../../assets/Colors';

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

export default SocialButton;
