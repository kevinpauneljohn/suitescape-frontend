import React from 'react';
import {View} from 'react-native';
import style from '../../screens/Onboarding/OnboardingStyles';
import {Colors} from '../../assets/Colors';

const DotsView = ({index, size}) => {
  const renderDots = () => {
    const dots = [];

    for (let i = 0; i < size; i++) {
      dots.push(
        <View
          key={i}
          style={{
            ...style.dot,
            ...(i === index && {width: 30}),
            ...{backgroundColor: i === index ? Colors.blue : 'gray'},
          }}
        />,
      );
    }

    return dots;
  };

  return <View style={style.dotContainer}>{renderDots()}</View>;
};

export default DotsView;
