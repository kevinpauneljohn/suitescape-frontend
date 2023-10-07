import React, {useCallback, useRef, useState} from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  StatusBar,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import VideoListing from '../../components/VideoListing/VideoListing';
import style from './HomeStyles';
import useFetchVideos from '../../hooks/useFetchVideos';
import Icon from 'react-native-vector-icons/Ionicons';
import NotificationBadge from '../../components/NotificationBadge/NotificationBadge';
import {pressedOpacity} from '../../assets/styles/globalStyles';
import HeaderIcon from '../../components/HeaderIcon/HeaderIcon';

const VIEWABILITY_CONFIG = {
  // Adjust this if onViewableItemsChanged is not working properly
  itemVisiblePercentThreshold: 80,

  // Fixes scroll lag
  // minimumViewTime: 280,
};

const Home = () => {
  const {videos, isLoading, isRefreshing, fetchVideos} = useFetchVideos();
  const {height} = useWindowDimensions();
  const bottomTabHeight = useBottomTabBarHeight();

  const [index, setIndex] = useState(null);
  const [lastPlayedIndex, setLastPlayedIndex] = useState(null);
  const [isFocused, setIsFocused] = useState(true);
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);

  const statusBarHeight = StatusBar.currentHeight;
  const videoHeight = height - bottomTabHeight + statusBarHeight;

  useFocusEffect(
    useCallback(() => {
      setIsFocused(true);
      return () => {
        setIsFocused(false);
      };
    }, []),
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

  const renderItem = ({item}) => (
    <VideoListing
      item={item}
      height={videoHeight}
      setIsScrollEnabled={setIsScrollEnabled}
      isHomeScreenFocused={isFocused}
      notInFocus={index === null || index !== item.id}
    />
  );

  const onRefresh = () => {
    fetchVideos(null).catch(() => {});
  };

  const onEndReached = () => {
    fetchVideos().catch(() => {});
  };

  const colorScheme = useColorScheme();

  return (
    <View style={style.mainContainer}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={
          isFocused || colorScheme === 'dark' ? 'light-content' : 'dark-content'
        }
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
          size={0}
          onPress={() => console.log('Notifications')}
        />
      </HeaderIcon>
      <FlatList
        data={videos}
        contentOffset={{x: 0, y: 0}}
        scrollEnabled={isScrollEnabled}
        windowSize={5}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        snapToInterval={videoHeight}
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
        disableIntervalMomentum={true}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
    </View>
  );
};

export default Home;
