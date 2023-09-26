import React, {useRef, useState} from 'react';
import {FlatList, PixelRatio, useWindowDimensions, View} from 'react-native';
import slides from '../../data/slideData';
import {Routes} from '../../navigation/Routes';
import {useNavigation} from '@react-navigation/native';
import style from './SliderStyles';
import LogoText from '../LogoText/LogoText';
import Button from '../Button/Button';
import SliderItem from '../SliderItem/SliderItem';
import AuthSwitchPrompt from '../AuthSwitchPrompt/AuthSwitchPrompt';
import {Colors} from '../../assets/Colors';
import SliderHeader from '../SliderHeader/SliderHeader';
import {settingsStorage} from '../../storage/settingsStorage';

const Slider = () => {
  const navigation = useNavigation();

  const [index, setIndex] = useState(0);
  const flatListRef = useRef(null);
  const endReached = index === slides.length - 1;

  const {width} = useWindowDimensions();

  const pixelRatio = PixelRatio.get();
  const higherDPI = pixelRatio > 2;
  const lowerDPI = pixelRatio <= 2;

  const handleNextButtonClick = () => {
    if (endReached) {
      settingsStorage.setBool('skipOnboarding', true);
      navigation.replace(Routes.SIGNUP);
      return;
    }
    flatListRef.current.scrollToIndex({index: index + 1, animated: true});
  };

  const handlePrevButtonClick = () => {
    flatListRef.current.scrollToIndex({
      index: index - 1,
      animated: true,
    });
  };

  const onScroll = e => {
    const offset = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offset / width);
    if (newIndex === index) {
      return;
    }
    setIndex(newIndex);
  };

  const renderDot = i => (
    <View
      key={i}
      style={{
        ...style.dot,
        ...(i === index && {width: 30}),
        ...{backgroundColor: i === index ? Colors.blue : 'gray'},
      }}
    />
  );

  return (
    <View>
      <SliderHeader
        index={index}
        onPrevButtonClick={handlePrevButtonClick}
        showSkipButton={endReached && lowerDPI}
      />
      <LogoText />
      <FlatList
        ref={flatListRef}
        initialScrollIndex={index}
        keyExtractor={item => item.id}
        data={slides}
        renderItem={({item}) => <SliderItem {...item} />}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        snapToAlignment={'center'}
        decelerationRate={'fast'}
        disableIntervalMomentum={true}
        bounces={false}
        onScroll={onScroll}
      />
      <View style={style.dotContainer}>
        {slides.map((_, i) => renderDot(i))}
      </View>
      <View style={style.nextButtonContainer}>
        <Button onPress={handleNextButtonClick}>
          {endReached ? 'Get Started' : 'Next'}
        </Button>
      </View>
      {endReached && higherDPI && <AuthSwitchPrompt onboarding={true} />}
    </View>
  );
};

export default Slider;
