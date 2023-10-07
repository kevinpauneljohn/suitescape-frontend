import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import style from './HeaderOnboardingStyles';
import ButtonBack from '../ButtonBack/ButtonBack';
import {Routes} from '../../navigation/Routes';
import ButtonLink from '../ButtonLink/ButtonLink';
import {settingsStorage} from '../../storage/settingsStorage';
import ButtonOutlined from '../ButtonOutlined/ButtonOutlined';

const HeaderOnboarding = ({
  index,
  onPrevButtonClick,
  showSkipButton = false,
}) => {
  const navigation = useNavigation();

  const handleSkipButtonClick = () => {
    settingsStorage.setBool('skipOnboarding', true);
    navigation.replace(Routes.SIGNUP);
  };

  const handleSignInButtonClick = () => {
    settingsStorage.setBool('skipOnboarding', true);
    navigation.replace(Routes.LOGIN);
  };

  return (
    <View style={style.header}>
      <View style={style.headerLeft}>
        {index > 0 && <ButtonBack onPress={onPrevButtonClick} />}
      </View>
      <View style={style.headerRight}>
        {index === 0 && (
          <ButtonOutlined
            onPress={handleSkipButtonClick}
            containerStyle={style.skipButton}>
            Skip
          </ButtonOutlined>
        )}
        {showSkipButton && (
          <View style={style.signInButtonContainer}>
            <ButtonLink onPress={handleSignInButtonClick}>Sign In</ButtonLink>
          </View>
        )}
      </View>
    </View>
  );
};

export default HeaderOnboarding;
