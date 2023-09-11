import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import style from '../Slider/SliderStyles';
import BackButton from '../BackButton/BackButton';
import SkipButton from '../SkipButton/SkipButton';
import {Routes} from '../../navigation/Routes';
import Link from '../Link/Link';
import {settingsStorage} from '../../storage/settingsStorage';

const SliderHeader = ({index, onPrevButtonClick, showSkipButton = false}) => {
  const navigation = useNavigation();
  return (
    <View style={style.header}>
      <View style={style.headerLeft}>
        {index > 0 && <BackButton onPress={onPrevButtonClick} />}
      </View>
      <View style={style.headerRight}>
        {index === 0 && (
          <SkipButton
            onPress={() => {
              settingsStorage.setBool('skipOnboarding', true);
              navigation.replace(Routes.SignUp);
            }}
          />
        )}
        {showSkipButton && (
          <View style={style.signInButtonContainer}>
            <Link
              onPress={() => {
                settingsStorage.setBool('skipOnboarding', true);
                navigation.replace(Routes.Login);
              }}>
              Sign In
            </Link>
          </View>
        )}
      </View>
    </View>
  );
};

export default SliderHeader;
