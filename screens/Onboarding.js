import React from 'react';
import {SafeAreaView} from 'react-native';
import Slider from '../components/Slider/Slider';

const Onboarding = ({navigation}) => {
  return (
    <SafeAreaView>
      <Slider navigation={navigation} />
    </SafeAreaView>
  );
};

export default Onboarding;
