import React, {useEffect, useRef, useState} from 'react';
import slides from '../../data/onboardingData';
import {FlatList, PixelRatio, useWindowDimensions, View} from 'react-native';
import {Routes} from '../../navigation/Routes';
import style from './SliderStyles';
import Logo from '../Logo/Logo';
import Dots from '../Dots/Dots';
import Button from '../Button/Button';
import SliderItem from '../SliderItem/SliderItem';
import BackButton from '../BackButton/BackButton';
import SignInButton from '../SignInButton/SignInButton';
import SkipButton from '../SkipButton/SkipButton';
import SignInHint from '../SignInHint/SignInHint';

const Slider = ({navigation}) => {
  const [index, setIndex] = useState(0);
  const flatListRef = useRef(null);
  const endReached = index === slides.length - 1;

  const pixelRatio = PixelRatio.get();
  const higherDPI = pixelRatio > 2;
  const lowerDPI = pixelRatio <= 2;

  const {width} = useWindowDimensions();

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

  return (
    <View>
      <View style={style.header}>
        <View style={style.headerLeft}>
          {index > 0 && (
            <BackButton onPress={() => setIndex(prevIndex => prevIndex - 1)} />
          )}
        </View>
        <View style={style.headerRight}>
          {endReached && lowerDPI && <SignInButton />}
          {index === 0 && (
            <SkipButton onPress={() => navigation.replace(Routes.SignUp)} />
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
      <Dots index={index} />
      <Button onPress={() => handleNextButtonClick()}>
        {endReached ? 'Get Started' : 'Next'}
      </Button>
      {endReached && higherDPI && <SignInHint navigation={navigation} />}
    </View>
  );
};

export default Slider;
