import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import style from '../Slider/SliderStyles';
import BackButton from '../BackButton/BackButton';
import SkipButton from '../SkipButton/SkipButton';
import {Routes} from '../../navigation/Routes';
import Link from '../Link/Link';

const SliderHeader = ({index, setIndex, endReached, lowerDPI}) => {
  const navigation = useNavigation();
  return (
    <View style={style.header}>
      <View style={style.headerLeft}>
        {index > 0 && (
          <BackButton onPress={() => setIndex(prevIndex => prevIndex - 1)} />
        )}
      </View>
      <View style={style.headerRight}>
        {index === 0 && (
          <SkipButton onPress={() => navigation.replace(Routes.SignUp)} />
        )}
        {endReached && lowerDPI && (
          <View style={style.signInButtonContainer}>
            <Link onPress={() => navigation.replace(Routes.Login)}>
              Sign In
            </Link>
          </View>
        )}
      </View>
    </View>
  );
};

export default SliderHeader;
