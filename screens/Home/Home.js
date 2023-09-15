import React, {useCallback, useRef, useState} from 'react';
import {FlatList, StatusBar, useWindowDimensions, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import VideoItem from '../../components/VideoItem/VideoItem';
import style from './HomeStyles';

const VIEWABILITY_CONFIG = {
  itemVisiblePercentThreshold: 90,
};

const Home = () => {
  const videos = Array(5)
    .fill({
      title: 'Sample',
      url: {
        uri: 'https://assets.mixkit.co/videos/download/mixkit-avenue-with-trees-buildings-and-fast-cars-at-dusk-34563.mp4',
      },
    })
    .map((item, id) => ({...item, id: id + 1}));

  const [index, setIndex] = useState(0);
  const [lastPlayedIndex, setLastPlayedIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const {width, height} = useWindowDimensions();

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content', true);

      if (lastPlayedIndex !== null) {
        setIndex(lastPlayedIndex);
      }
      return () => {
        setIndex(null);
      };
    }, [lastPlayedIndex]),
  );

  const handleViewableItemsChanged = useCallback(({viewableItems}) => {
    const firstViewableItem = viewableItems[0];
    if (firstViewableItem?.isViewable) {
      const newIndex = firstViewableItem.item.id - 1;
      setLastPlayedIndex(newIndex);
      setIndex(newIndex);
    }
  }, []);

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: VIEWABILITY_CONFIG,
      onViewableItemsChanged: handleViewableItemsChanged,
    },
  ]);

  return (
    <View style={style.mainContainer}>
      <FlatList
        data={videos}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <VideoItem
            index={index}
            item={item}
            isPaused={isPaused}
            togglePause={() => setIsPaused(prevState => !prevState)}
            width={width}
            height={height}
          />
        )}
        showsVerticalScrollIndicator={false}
        snapToInterval={height}
        snapToAlignment={'center'}
        decelerationRate={'fast'}
        onMomentumScrollBegin={() => setIsPaused(false)}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
    </View>
  );
};

export default Home;
