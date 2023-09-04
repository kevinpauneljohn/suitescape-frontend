import React from 'react';
import {View} from 'react-native';
import {Colors} from '../../assets/Colors';
import slides from '../../data/onboardingData';
import style from './DotsStyles';

const Dots = ({index}) => {
  const renderDot = i => (
    <View
      key={i}
      style={{
        ...style.dot,
        ...{backgroundColor: i === index ? Colors.blue : 'gray'},
      }}
    />
  );

  return (
    <View style={style.container}>{slides.map((_, i) => renderDot(i))}</View>
  );
};

export default Dots;
