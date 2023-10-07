import React from 'react';
import {Pressable, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Facebook from '../../assets/images/svgs/icons8-facebook.svg';
import Google from '../../assets/images/svgs/icons8-google.svg';
import style from './ButtonSocialLoginStyles';
import {pressedOpacity} from '../../assets/styles/globalStyles';

const ButtonSocialLogin = ({type}) => {
  const SocialTypes = {
    phone: {
      label: 'Continue with Phone',
      iconComponent: <Icon name={'mobile-phone'} size={40} color={'gray'} />,
      onPress: () => console.log('Phone'),
    },
    facebook: {
      label: 'Continue with Facebook',
      iconComponent: <Facebook width={35} height={35} />,
      onPress: () => console.log('Facebook'),
    },
    google: {
      label: 'Continue with Google',
      iconComponent: <Google width={32} height={32} />,
      onPress: () => console.log('Google'),
    },
  };

  return (
    <Pressable onPress={SocialTypes[type]?.onPress} style={style.mainContainer}>
      {({pressed}) => (
        <View
          style={{
            ...style.secondaryContainer,
            ...pressedOpacity(pressed),
          }}>
          <View style={style.iconContainer}>
            {SocialTypes[type]?.iconComponent}
          </View>
          <Text style={style.text}>{SocialTypes[type]?.label}</Text>
        </View>
      )}
    </Pressable>
  );
};

export default ButtonSocialLogin;
