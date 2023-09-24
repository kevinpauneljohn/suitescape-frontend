import React, {useCallback, useRef, useState} from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  StatusBar,
  useWindowDimensions,
  View,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import VideoItem from '../../components/VideoItem/VideoItem';
import style from './HomeStyles';
import useFetchVideos from '../../hooks/useFetchVideos';
import Icon from 'react-native-vector-icons/Ionicons';
import NotificationBadge from '../../components/NotificationBadge/NotificationBadge';
import {pressedOpacity} from '../../assets/styles/globalStyles';
import HeaderIcon from '../../components/HeaderIcon/HeaderIcon';

const VIEWABILITY_CONFIG = {
  // Adjust this if onViewableItemsChanged is not working properly
  itemVisiblePercentThreshold: 80,
};

const Home = () => {
  const {videos, isLoading, isRefreshing, fetchVideos} = useFetchVideos();
  const {width, height} = useWindowDimensions();
  const bottomTabHeight = useBottomTabBarHeight();

  const [index, setIndex] = useState(null);
  const [lastPlayedIndex, setLastPlayedIndex] = useState(null);
  const [isClickPaused, setIsClickPaused] = useState(false);
  const [isFocused, setIsFocused] = useState(true);
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setIsFocused(true);

      if (index === null && videos[0]) {
        setIndex(videos[0]?.id);
      } else if (lastPlayedIndex !== null) {
        setIndex(lastPlayedIndex);
      }
      return () => {
        setIndex(null);
        setIsFocused(false);
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
    fetchVideos(null).catch(() => {});
  };

  const onEndReached = () => {
    fetchVideos().catch(() => {});
  };

  const onMomentumScrollBegin = () => {
    setIsClickPaused(false);
  };

  return (
    <View style={style.mainContainer}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isFocused ? 'light-content' : 'dark-content'}
      />
      <HeaderIcon>
        <Pressable
          onPress={() => console.log('Options')}
          style={({pressed}) => pressedOpacity(pressed)}>
          <Icon name={'options'} size={30} color={'white'} />
        </Pressable>
      </HeaderIcon>
      <HeaderIcon right={true}>
        <NotificationBadge
          size={1}
          onPress={() => console.log('Notifications')}
        />
      </HeaderIcon>
      <FlatList
        data={videos}
        keyExtractor={item => item.id}
        scrollEnabled={isScrollEnabled}
        renderItem={({item}) => (
          <VideoItem
            item={item}
            notInFocus={index === null || index !== item.id}
            isClickPaused={isClickPaused}
            setIsClickPaused={setIsClickPaused}
            setIsScrollEnabled={setIsScrollEnabled}
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
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={onMomentumScrollBegin}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
    </View>
  );
};

export default Home;
