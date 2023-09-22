import React, {memo, useEffect, useRef, useState} from 'react';
import {Pressable, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import style from './VideoItemStyles';
import {baseURL} from '../../services/SuitescapeAPI';
import {userStorage} from '../../storage/userStorage';
import useAppState from '../../hooks/useAppState';
import VideoItemDetails from '../VideoItemDetails/VideoItemDetails';
import VideoItemIconView from '../VideoItemIconView/VideoItemIconView';
import VideoItemProgressBar from '../VideoItemProgressBar/VideoItemProgressBar';

const VideoItem = ({
  item,
  notInFocus,
  isClickPaused,
  setIsClickPaused,
  width,
  height,
}) => {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeekPaused, setIsSeekPaused] = useState(false);

  const videoRef = useRef(null);
  const appState = useAppState();
  const inBackground = !!appState.match(/inactive|background/);
  const paused = isSeekPaused || isClickPaused || inBackground || notInFocus;

  const {listing} = item;
  const {name, location, ratings} = item.listing;
  const {price} = listing.room_categories[0] || 0;
  const flooredPrice = Math.floor(price);

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
          onLoad={data => setDuration(data.duration)}
          onProgress={data => setProgress(data.currentTime)}
          resizeMode={'cover'}
          paused={paused}
          repeat={true}
          style={{width, height}}
          onError={e => console.error(e)}
        />
      </Pressable>
      <VideoItemDetails
        name={name}
        rating={ratings}
        location={location}
        price={flooredPrice}
      />
      <VideoItemIconView likes={'10.1k'} />
      <VideoItemProgressBar
        duration={duration}
        progress={progress}
        setIsPaused={setIsSeekPaused}
        videoRef={videoRef}
      />
    </View>
  );
};

export default memo(VideoItem);
