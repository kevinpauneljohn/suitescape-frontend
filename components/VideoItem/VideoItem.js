import React, {memo, useEffect, useRef, useState} from 'react';
import {Pressable, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import style from './VideoItemStyles';
import {userStorage} from '../../storage/userStorage';
import useAppState from '../../hooks/useAppState';
import useListing from '../../hooks/useListing';
import {baseURL} from '../../services/SuitescapeAPI';
import VideoItemDetails from '../VideoItemDetails/VideoItemDetails';
import VideoItemIconView from '../VideoItemIconView/VideoItemIconView';
import VideoItemProgressBar from '../VideoItemProgressBar/VideoItemProgressBar';

const VideoItem = ({
  item,
  notInFocus,
  isClickPaused,
  setIsClickPaused,
  setIsScrollEnabled,
  width,
  height,
}) => {
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoLength, setVideoLength] = useState(0);
  const [isSectionShown, setIsSectionShown] = useState(false);
  const [isSeekPaused, setIsSeekPaused] = useState(false);
  const videoRef = useRef(null);

  const listing = useListing(item);
  const appState = useAppState();

  const token = userStorage.getString('token');
  const inBackground = !!appState.match(/inactive|background/);
  const paused = isSeekPaused || isClickPaused || inBackground || notInFocus;

  useEffect(() => {
    if (!isClickPaused && notInFocus) {
      videoRef.current.seek(0);
    }
  }, [isClickPaused, notInFocus]);

  const togglePause = () => {
    setIsClickPaused(prevState => !prevState);
  };

  const setShowModal = () => {
    setIsSectionShown(true);
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
          onLoad={({duration}) => setVideoLength(duration)}
          onProgress={({currentTime}) => setVideoProgress(currentTime)}
          resizeMode={'cover'}
          paused={paused}
          repeat={true}
          style={{width, height}}
          onError={e => console.error(e)}
        />
      </Pressable>
      <VideoItemDetails
        name={listing.name}
        rating={listing.avgRating}
        location={listing.location}
        price={listing.price}
      />
      <VideoItemIconView
        id={item.id}
        likes={listing.likes}
        isVideoLiked={listing.isLiked}
        isVideoSaved={listing.isSaved}
        setShowModal={setShowModal}
      />
      <VideoItemProgressBar
        length={videoLength}
        progress={videoProgress}
        setIsPaused={setIsSeekPaused}
        setIsScrollEnabled={setIsScrollEnabled}
        videoRef={videoRef}
      />

      {/*<Portal>*/}
      {/*  <Modal*/}
      {/*    visible={showModal}*/}
      {/*    onDismiss={() => setShowModal(false)}*/}
      {/*    contentContainerStyle={{*/}
      {/*      backgroundColor: 'white',*/}
      {/*      position: 'absolute',*/}
      {/*      bottom: 60,*/}
      {/*      left: 0,*/}
      {/*      right: 0,*/}
      {/*    }}>*/}
      {/*    <ScrollView*/}
      {/*      horizontal={true}*/}
      {/*      contentContainerStyle={{*/}
      {/*        height: 150,*/}
      {/*        alignItems: 'center',*/}
      {/*        marginHorizontal: 20,*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  </Modal>*/}
      {/*</Portal>*/}
    </View>
  );
};

export default memo(VideoItem);
