import React, {useCallback, useEffect, useRef, useState} from 'react';
import slides from '../../data/onboardingData';
import {
  FlatList,
  PixelRatio,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {Routes} from '../../navigation/Routes';
import style from './SliderStyles';
import Dots from '../Dots/Dots';
import Button from '../Button/Button';
import SliderItem from '../SliderItem/SliderItem';
import BackButton from '../BackButton/BackButton';
import SignInButton from '../SignInButton/SignInButton';
import SkipButton from '../SkipButton/SkipButton';

const Slider = ({navigation}) => {
  // State to keep track of current slide index.
  const [index, setIndex] = useState(0);

  // Reference to the FlatList.
  const flatListRef = useRef(null);

  // Determine if the last slide has been reached.
  const endReached = index === slides.length - 1;

  // Get pixel ratio for DPI-based rendering.
  const pixelRatio = PixelRatio.get();
  const higherDPI = pixelRatio > 2;
  const lowerDPI = pixelRatio <= 2;

  const {width} = useWindowDimensions();

  // Navigation header setup
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerBackground: () => null,
    });
  }, [navigation]);

  // Function to render the header's right button based on the slide index.
  const renderHeaderRight = useCallback(() => {
    console.log('Render header right');
    if (index === 0) {
      return <SkipButton onPress={() => navigation.replace(Routes.Home)} />;
    }
    if (endReached && lowerDPI) {
      return <SignInButton />;
    }
    return null;
  }, [endReached, index, lowerDPI, navigation]);

  // Function to render the header's left button based on the slide index.
  const renderHeaderLeft = useCallback(() => {
    console.log('Render header left');
    if (index > 0) {
      return (
        <BackButton onPress={() => setIndex(prevIndex => prevIndex - 1)} />
      );
    }
    return null;
  }, [index]);

  // Update the header whenever the slide index changes.
  useEffect(() => {
    console.log('Render header');
    navigation.setOptions({
      headerRight: renderHeaderRight,
      headerLeft: renderHeaderLeft,
    });

    // Scroll to the current index.
    flatListRef.current.scrollToIndex({index, animated: true});
  }, [index, navigation, renderHeaderLeft, renderHeaderRight]);

  // Handler for the 'Next' button click.
  const handleNextButtonClick = () => {
    if (endReached) {
      navigation.replace(Routes.Home);
      return;
    }
    setIndex(prevIndex => prevIndex + 1);
  };

  return (
    <View>
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
        <Text style={style.nextButtonText}>
          {endReached ? 'Get Started' : 'Next'}
        </Text>
      </Button>
      {endReached && higherDPI && (
        <View style={style.signInContainer}>
          <Text style={{...style.signInContentText}}>
            Already have an account?
          </Text>
          <Text style={{...style.signInContentText, ...style.link}}>
            Sign in
          </Text>
        </View>
      )}
    </View>
  );
};

export default Slider;
