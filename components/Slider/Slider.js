import React, {useEffect, useRef, useState} from 'react';
import slides from '../../data/onboardingData';
import {FlatList, PixelRatio, useWindowDimensions, View} from 'react-native';
import {Routes} from '../../navigation/Routes';
import {useNavigation} from '@react-navigation/native';
import style from './SliderStyles';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';
import SliderItem from '../SliderItem/SliderItem';
import BackButton from '../BackButton/BackButton';
import SkipButton from '../SkipButton/SkipButton';
import Link from '../Link/Link';
import AuthSwitchPrompt from '../AuthSwitchPrompt/AuthSwitchPrompt';
import {Colors} from '../../assets/Colors';

const Slider = () => {
  const navigation = useNavigation();

  const [index, setIndex] = useState(0);
  const flatListRef = useRef(null);
  const endReached = index === slides.length - 1;

  const {width} = useWindowDimensions();

  const pixelRatio = PixelRatio.get();
  const higherDPI = pixelRatio > 2;
  const lowerDPI = pixelRatio <= 2;

  useEffect(() => {
    flatListRef.current.scrollToIndex({index, animated: true});
  }, [index]);

  const handleNextButtonClick = () => {
    if (endReached) {
      navigation.replace(Routes.SignUp);
      return;
    }
    setIndex(prevIndex => prevIndex + 1);
  };

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
    <View>
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
      <Logo />
      <FlatList
        ref={flatListRef}
        initialScrollIndex={index}
        keyExtractor={item => item.id}
        data={slides}
        renderItem={({item}) => <SliderItem {...item} width={width} />}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        snapToInterval={width}
        snapToAlignment={'center'}
        decelerationRate={'fast'}
        x
      />
      <View style={style.dotContainer}>
        {slides.map((_, i) => renderDot(i))}
      </View>
      <View style={style.nextButtonContainer}>
        <Button onPress={() => handleNextButtonClick()}>
          {endReached ? 'Get Started' : 'Next'}
        </Button>
      </View>
      {endReached && higherDPI && <AuthSwitchPrompt onboarding={true} />}
    </View>
  );
};

export default Slider;
