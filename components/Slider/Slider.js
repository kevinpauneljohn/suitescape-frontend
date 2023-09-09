import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, PixelRatio, useWindowDimensions, View} from 'react-native';
import slides from '../../data/slideData';
import {Routes} from '../../navigation/Routes';
import {useNavigation} from '@react-navigation/native';
import style from './SliderStyles';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';
import SliderItem from '../SliderItem/SliderItem';
import AuthSwitchPrompt from '../AuthSwitchPrompt/AuthSwitchPrompt';
import {Colors} from '../../assets/Colors';
import SliderHeader from '../SliderHeader/SliderHeader';
import {settingsStorage} from '../../storage/settingsStorage';

const Slider = () => {
  const navigation = useNavigation();

  const [index, setIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const flatListRef = useRef(null);
  const endReached = index === slides.length - 1;

  const {width} = useWindowDimensions();

  const pixelRatio = PixelRatio.get();
  const higherDPI = pixelRatio > 2;
  const lowerDPI = pixelRatio <= 2;

  useEffect(() => {
    flatListRef.current.scrollToIndex({index, animated: true});

    const timeout = setTimeout(() => {
      setIsScrolling(false);
    }, 150);

    return () => clearTimeout(timeout);
  }, [index]);

  const handleNextButtonClick = () => {
    if (endReached) {
      settingsStorage.setBool('showOnboarding', false);
      navigation.replace(Routes.SignUp);
      return;
    }
    setIsScrolling(true);
    setIndex(prevIndex => prevIndex + 1);
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

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        itemVisiblePercentThreshold: 75,
      },
      onViewableItemsChanged: useCallback(({viewableItems}) => {
        if (viewableItems[0]) {
          setIndex(viewableItems[0].index);
        }
      }, []),
    },
  ]);

  return (
    <View>
      <SliderHeader
        index={index}
        isScrolling={isScrolling}
        setIndex={setIndex}
        setIsScrolling={setIsScrolling}
        endReached={endReached}
        lowerDPI={lowerDPI}
      />
      <Logo />
      <FlatList
        ref={flatListRef}
        initialScrollIndex={index}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        keyExtractor={item => item.id}
        data={slides}
        renderItem={({item}) => <SliderItem {...item} width={width} />}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        snapToAlignment={'center'}
        decelerationRate={'fast'}
      />
      <View style={style.dotContainer}>
        {slides.map((_, i) => renderDot(i))}
      </View>
      <View style={style.nextButtonContainer}>
        <Button disabled={isScrolling} onPress={() => handleNextButtonClick()}>
          {endReached ? 'Get Started' : 'Next'}
        </Button>
      </View>
      {endReached && higherDPI && <AuthSwitchPrompt onboarding={true} />}
    </View>
  );
};

export default Slider;
