import React, {useCallback, useRef, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  StatusBar,
  useWindowDimensions,
  View,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import VideoItem from '../../components/VideoItem/VideoItem';
import style from './HomeStyles';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import useFetchVideos from '../../hooks/useFetchVideos';
import {
  bottomTabOptions,
  tabBarStyle,
} from '../../navigation/BottomTabs/BottomTabs';

const VIEWABILITY_CONFIG = {
  // Adjust this if onViewableItemsChanged is not working properly
  itemVisiblePercentThreshold: 80,
};

const Home = ({navigation}) => {
  const {videos, isLoading, isRefreshing, fetchVideos, resetVideos} =
    useFetchVideos();
  const {width, height} = useWindowDimensions();
  const bottomTabHeight = useBottomTabBarHeight();

  const [index, setIndex] = useState(null);
  const [lastPlayedIndex, setLastPlayedIndex] = useState(null);
  const [isClickPaused, setIsClickPaused] = useState(false);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content', true);

      navigation.setOptions({
        ...bottomTabOptions,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          ...tabBarStyle,
          backgroundColor: 'black',
        },
      });

      return () => {
        StatusBar.setBarStyle('dark-content', true);
        navigation.setOptions({
          ...bottomTabOptions,
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'black',
          tabBarStyle: {
            ...tabBarStyle,
            backgroundColor: 'white',
          },
        });
      };
    }, [navigation]),
  );

  useFocusEffect(
    useCallback(() => {
      if (index === null && videos[0]) {
        setIndex(videos[0]?.id);
      } else if (lastPlayedIndex !== null) {
        setIndex(lastPlayedIndex);
      }
      return () => {
        setIndex(null);
      };
    }, [lastPlayedIndex, videos]),
  );

  const handleViewableItemsChanged = useCallback(({viewableItems}) => {
    const firstViewableItem = viewableItems[0];
    if (firstViewableItem?.isViewable) {
      const newIndex = firstViewableItem.item.id;
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

  const onRefresh = () => {
    resetVideos();
    fetchVideos(null);
  };

  const onEndReached = () => {
    fetchVideos();
  };

  const onMomentumScrollBegin = () => {
    setIsClickPaused(false);
  };

  return (
    <View style={style.mainContainer}>
      <FlatList
        data={videos}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <VideoItem
            item={item}
            notInFocus={index === null || index !== item.id}
            isClickPaused={isClickPaused}
            setIsClickPaused={setIsClickPaused}
            width={width}
            height={height - bottomTabHeight}
          />
        )}
        showsVerticalScrollIndicator={false}
        snapToInterval={height - bottomTabHeight}
        snapToAlignment={'center'}
        decelerationRate={'fast'}
        refreshControl={
          <RefreshControl
            tintColor={'white'}
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        }
        onEndReached={onEndReached}
        onEndReachedThreshold={0.6}
        onMomentumScrollBegin={onMomentumScrollBegin}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
    </View>
  );
};

export default Home;
