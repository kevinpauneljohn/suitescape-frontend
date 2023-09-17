import React, {memo, useEffect, useRef} from 'react';
import {Pressable, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import style from './VideoItemStyles';
import {baseURL} from '../../services/SuitescapeAPI';
import {userStorage} from '../../storage/userStorage';
import useAppState from '../../hooks/useAppState';
import VideoItemDetails from '../VideoItemDetails/VideoItemDetails';
import VideoItemIconView from '../VideoItemIconView/VideoItemIconView';

const VideoItem = ({
  item,
  notInFocus,
  isClickPaused,
  setIsClickPaused,
  width,
  height,
}) => {
  const videoRef = useRef(null);
  const appState = useAppState();
  const inBackground = !!appState.match(/inactive|background/);
  const paused = isClickPaused || inBackground || notInFocus;

  const token = userStorage.getString('token');

  useEffect(() => {
    if (!isClickPaused && notInFocus) {
      videoRef.current.seek(0);
    }
  }, [isClickPaused, notInFocus]);

  const togglePause = () => {
    setIsClickPaused(prevState => !prevState);
  };

  return (
    <View>
      <Pressable onPress={togglePause}>
        {isClickPaused && (
          <View style={style.pauseContainer}>
            <Icon
              name="play"
              size={50}
              color="white"
              style={style.pauseButton}
            />
          </View>
        )}
        <Video
          ref={videoRef}
          source={{
            uri: `${baseURL}/videos/${item.id}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }}
          resizeMode={'cover'}
          paused={paused}
          repeat={true}
          style={{width, height}}
          onError={e => console.error(e)}
        />
      </Pressable>
      <VideoItemDetails
        name={'DreamHome'}
        stars={4}
        location={'Baguio City, Philippines'}
        price={'3000'}
      />
      <VideoItemIconView likes={'10.1k'} />
    </View>
  );
};

export default memo(VideoItem);
