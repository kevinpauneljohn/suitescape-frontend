import React from 'react';
import {SafeAreaView} from 'react-native';
import Logo from '../components/Logo/Logo';
import Slider from '../components/Slider/Slider';

const Onboarding = ({navigation}) => {
  return (
    <SafeAreaView>
      <Logo />
      <Slider navigation={navigation} />
    </SafeAreaView>
  );
};

export default Onboarding;
