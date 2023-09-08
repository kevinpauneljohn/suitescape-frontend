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

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        itemVisiblePercentThreshold: 100,
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
        setIndex={setIndex}
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
        <Button onPress={() => handleNextButtonClick()}>
          {endReached ? 'Get Started' : 'Next'}
        </Button>
      </View>
      {endReached && higherDPI && <AuthSwitchPrompt onboarding={true} />}
    </View>
  );
};

export default Slider;
