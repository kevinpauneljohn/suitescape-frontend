import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import Slider from '../../components/Slider/Slider';
import {useSettings} from '../../storage/settingsStorage';
import {Routes} from '../../navigation/Routes';

const Onboarding = ({navigation}) => {
  const [showOnboarding, _setShowOnboarding] = useSettings(
    'showOnboarding',
    true,
  );
  const [token, _setToken] = useSettings('token', '');

  useEffect(() => {
    // Reset settings for testing (Uncomment and reload the app after)
    // _setShowOnboarding(true);
    // _setToken('');

    if (token) {
      navigation.replace(Routes.Home);
      return;
    }
    if (!showOnboarding) {
      navigation.replace(Routes.Login);
    }
  });

  return (
    <SafeAreaView>
      <Slider />
    </SafeAreaView>
  );
};

export default Onboarding;
