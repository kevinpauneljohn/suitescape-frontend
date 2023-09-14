import React, {useCallback, useRef, useState} from 'react';
import {
  FlatList,
  Pressable,
  StatusBar,
  useWindowDimensions,
  View,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useFocusEffect} from '@react-navigation/native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

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
  const bottomTabHeight = useBottomTabBarHeight();

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

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        itemVisiblePercentThreshold: 90,
      },
      onViewableItemsChanged: useCallback(({viewableItems}) => {
        if (viewableItems.length > 0) {
          const firstViewableItem = viewableItems[0];
          if (firstViewableItem.isViewable) {
            const newIndex = firstViewableItem.item.id - 1;
            setIndex(newIndex);
            setLastPlayedIndex(newIndex);
          }
        }
      }, []),
    },
  ]);

  return (
    <View style={{backgroundColor: 'black'}}>
      <FlatList
        data={videos}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          const paused = isPaused || index === null || index !== item.id - 1;
          return (
            <Pressable
              onPress={() => {
                setIsPaused(prevState => !prevState);
              }}>
              {isPaused && (
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1,
                  }}>
                  <Icon
                    name="pause"
                    size={50}
                    color="white"
                    style={{opacity: 0.8}}
                  />
                </View>
              )}
              <Video
                source={item.url}
                resizeMode={'cover'}
                paused={paused}
                loop={true}
                onError={e => console.log(e)}
                style={{width, height}}
              />
            </Pressable>
          );
        }}
        contentContainerStyle={{marginBottom: bottomTabHeight}}
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
