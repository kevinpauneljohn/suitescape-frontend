import React from 'react';
import {Pressable, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Facebook from '../../assets/images/svgs/icons8-facebook.svg';
import Google from '../../assets/images/svgs/icons8-google.svg';
import style from './SocialButtonStyles';

const SocialButton = ({type}) => {
  const SocialTypes = {
    phone: {
      label: 'Continue with Phone',
      iconComponent: <Icon name={'mobile-phone'} size={30} color={'gray'} />,
      onPress: () => console.log('Phone'),
    },
    facebook: {
      label: 'Continue with Facebook',
      iconComponent: <Facebook width={30} height={30} />,
      onPress: () => console.log('Facebook'),
    },
    google: {
      label: 'Continue with Google',
      iconComponent: <Google width={26} height={26} />,
      onPress: () => console.log('Google'),
    },
  };

  return (
    <Pressable onPress={SocialTypes[type]?.onPress} style={style.mainContainer}>
      {({pressed}) => (
        <View
          style={{
            ...style.secondaryContainer,
            ...(pressed && {opacity: 0.5}),
          }}>
          {SocialTypes[type]?.iconComponent}
          <Text style={style.text}>{SocialTypes[type]?.label}</Text>
        </View>
      )}
    </Pressable>
  );
};

export default SocialButton;
