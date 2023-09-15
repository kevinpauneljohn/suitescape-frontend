import React from 'react';
import {Pressable, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import style from './VideoItemStyles';

const VideoItem = ({index, item, isPaused, togglePause, width, height}) => {
  const paused = isPaused || index === null || index !== item.id - 1;
  return (
    <Pressable onPress={togglePause}>
      {isPaused && (
        <View style={style.pauseContainer}>
          <Icon
            name="pause"
            size={50}
            color="white"
            style={style.pauseButton}
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
};

export default VideoItem;
