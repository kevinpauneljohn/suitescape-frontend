import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import Slider from '../../components/Slider/Slider';
import {useSettings} from '../../storage/settingsStorage';
import {useUser} from '../../storage/userStorage';
import {Routes} from '../../navigation/Routes';

const Onboarding = ({navigation}) => {
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
      navigation.replace(Routes.Home);
      return;
    }
    if (skipOnboarding) {
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
