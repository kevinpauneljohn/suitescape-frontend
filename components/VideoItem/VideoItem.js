import React, {forwardRef, memo, useState} from 'react';
import {ActivityIndicator, Pressable, View} from 'react-native';
import style from './VideoItemStyles';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Video from 'react-native-video';
import {baseURL} from '../../services/SuitescapeAPI';
import {userStorage} from '../../storage/userStorage';

const VideoItem = forwardRef(
  (
    {
      listingId,
      videoId,
      width,
      height,
      onLoad,
      onProgress,
      popUpIconSize = 55,
      overridePause = false,
      isInitialPaused = false,
      isInitialMuted = false,
    },
    ref,
  ) => {
    const [isVideoPaused, setIsVideoPaused] = useState(isInitialPaused);
    const [isVideoMuted, setIsVideoMuted] = useState(isInitialMuted);
    const [isVideoBuffering, setIsVideoBuffering] = useState(false);

    const paused = overridePause || isVideoPaused;
    const token = userStorage.getString('token');

    const togglePauseOrUnmute = () => {
      if (isVideoBuffering) {
        return;
      }
      if (isVideoMuted) {
        setIsVideoMuted(false);
        return;
      }
      setIsVideoPaused(prevState => !prevState);
    };

    const handleOnBuffer = ({isBuffering}) => {
      setIsVideoBuffering(isBuffering);
    };

    const handleOnSeek = ({seekTime}) => {
      seekTime === 0 && setIsVideoPaused(false);
    };

    return (
      <Pressable onPress={togglePauseOrUnmute}>
        {isVideoMuted && !isVideoBuffering && (
          <View style={style.popUpContainer}>
            <Icon
              name="volume-xmark"
              size={popUpIconSize}
              color="white"
              style={style.popUpOpacity}
            />
          </View>
        )}
        {isVideoPaused && (
          <View style={style.popUpContainer}>
            <Icon
              name="play"
              size={popUpIconSize}
              color="white"
              style={style.popUpOpacity}
            />
          </View>
        )}
        {isVideoBuffering && (
          <View style={style.popUpContainer}>
            <ActivityIndicator
              size={popUpIconSize}
              color={'white'}
              style={style.popUpOpacity}
            />
          </View>
        )}
        <Video
          ref={ref}
          source={{
            uri: `${baseURL}/listings/${listingId}/videos/${videoId}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }}
          onBuffer={handleOnBuffer}
          onSeek={handleOnSeek}
          onLoad={onLoad}
          onProgress={onProgress}
          paused={paused}
          muted={isVideoMuted}
          repeat={true}
          resizeMode={'cover'}
          style={{width, height}}
          onError={e => console.error(e)}
        />
      </Pressable>
    );
  },
);

export default memo(VideoItem);
