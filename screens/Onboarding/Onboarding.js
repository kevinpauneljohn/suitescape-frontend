import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, useWindowDimensions, View} from 'react-native';
import Slider from '../../components/Slider/Slider';
import {settingsStorage, useSettings} from '../../storage/settingsStorage';
import {useUser} from '../../storage/userStorage';
import {Routes} from '../../navigation/Routes';
import style from './OnboardingStyles';
import HeaderOnboarding from '../../components/HeaderOnboarding/HeaderOnboarding';
import LogoText from '../../components/LogoText/LogoText';
import slides from '../../data/slideData';
import ButtonLarge from '../../components/ButtonLarge/ButtonLarge';
import AuthSwitchPrompt from '../../components/AuthSwitchPrompt/AuthSwitchPrompt';
import DotsView from '../../components/DotsView/DotsView';
import SliderOnboardingItem from '../../components/SliderOnboardingItem/SliderOnboardingItem';

const Onboarding = ({navigation}) => {
  const [index, setIndex] = useState(0);
  const sliderRef = useRef(null);
  const endReached = index === slides.length - 1;

  const {width, height} = useWindowDimensions();
  const highScreenHeight = height > 850;

  const [skipOnboarding, _setSkipOnboarding] = useSettings(
    'skipOnboarding',
    false,
  );
  const [token, _setToken] = useUser('token', '');

  useEffect(() => {
    // Reset settings for testing (Uncomment and reload the app after)
    // _setSkipOnboarding(false);
    // _setToken('');

    if (token) {
      navigation.replace(Routes.BOTTOM_TABS);
      return;
    }
    if (skipOnboarding) {
      navigation.replace(Routes.LOGIN);
    }
  });

  const handleNextButtonClick = () => {
    if (endReached) {
      settingsStorage.setBool('skipOnboarding', true);
      navigation.replace(Routes.SIGNUP);
      return;
    }
    sliderRef.current.scrollToIndex({index: index + 1, animated: true});
  };

  const handlePrevButtonClick = () => {
    sliderRef.current.scrollToIndex({
      index: index - 1,
      animated: true,
    });
  };

  return (
    <SafeAreaView>
      <HeaderOnboarding
        index={index}
        onPrevButtonClick={handlePrevButtonClick}
        showSkipButton={endReached && !highScreenHeight}
      />
      <LogoText />
      <Slider
        ref={sliderRef}
        data={slides}
        index={index}
        onIndexChange={setIndex}
        width={width}
        renderItem={({item}) => <SliderOnboardingItem {...item} />}
      />
      <DotsView index={index} size={slides.length} />
      <View style={style.nextButtonContainer}>
        <ButtonLarge onPress={handleNextButtonClick}>
          {endReached ? 'Get Started' : 'Next'}
        </ButtonLarge>
      </View>
      {endReached && highScreenHeight && <AuthSwitchPrompt onboarding={true} />}
    </SafeAreaView>
  );
};

export default Onboarding;
