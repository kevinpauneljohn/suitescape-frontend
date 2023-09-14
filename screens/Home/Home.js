import React, {useCallback, useState} from 'react';
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
  const isVideoPaused = itemId => index === null || index !== itemId - 1;

  const {width, height} = useWindowDimensions();

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content', true);
      return () => setIndex(null);
    }, []),
  );

  return (
    <View style={{backgroundColor: 'black'}}>
      <FlatList
        data={videos}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          const paused = isVideoPaused(item.id);
          return (
            <Pressable
              onPress={() => {
                setIndex(index === null ? item.id - 1 : null);
              }}>
              {paused && (
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
                paused={paused}
                loop={true}
                resizeMode={'contain'}
                onError={e => console.log(e)}
                style={{width, height}}
              />
            </Pressable>
          );
        }}
        showsVerticalScrollIndicator={false}
        snapToInterval={height}
        snapToAlignment={'center'}
        decelerationRate={'fast'}
        onScroll={e => {
          const offset = e.nativeEvent.contentOffset.y;
          const newIndex = Math.round(offset / height);
          setIndex(newIndex);
        }}
      />
    </View>
  );
};

export default Home;
