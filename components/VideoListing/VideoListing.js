import React, {memo, useEffect, useRef, useState} from 'react';
import {useWindowDimensions} from 'react-native';
import useAppState from '../../hooks/useAppState';
import parseListing from '../../utilities/parseListing';
import VideoItem from '../VideoItem/VideoItem';
import VideoListingDetails from '../VideoListingDetails/VideoListingDetails';
import VideoListingIconsView from '../VideoListingIconsView/VideoListingIconsView';
import VideoItemProgressBar from '../VideoItemProgressBar/VideoItemProgressBar';
import {PaperProvider, Portal} from 'react-native-paper';
import SectionModal from '../SectionModal/SectionModal';

const VideoListing = ({
  item,
  height,
  setIsScrollEnabled,
  isHomeScreenFocused = false,
  notInFocus = false,
}) => {
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoLength, setVideoLength] = useState(0);
  const [isSeekingPaused, setIsSeekingPaused] = useState(false);
  const [isSectionShown, setIsSectionShown] = useState(false);

  const videoRef = useRef(null);
  const {width} = useWindowDimensions();
  const appState = useAppState();

  const listing = parseListing(item);
  const inBackground = !!appState.match(/inactive|background/);
  const videoPaused = isSeekingPaused || inBackground || notInFocus;

  useEffect(() => {
    if (notInFocus && isHomeScreenFocused) {
      videoRef.current.seek(0);
    }
  }, [isHomeScreenFocused, notInFocus]);

  const setShowModal = () => {
    setIsSectionShown(true);
  };

  const setHideModal = () => {
    setIsSectionShown(false);
  };

  return (
    <PaperProvider>
      <VideoItem
        ref={videoRef}
        listingId={listing.id}
        videoId={item.id}
        width={width}
        height={height}
        overridePause={videoPaused}
        onLoad={({duration}) => setVideoLength(duration)}
        onProgress={({currentTime}) => setVideoProgress(currentTime)}
      />
      <VideoListingDetails
        name={listing.name}
        rating={listing.avgRating}
        location={listing.location}
        price={listing.price}
      />
      <VideoListingIconsView listing={listing} setShowModal={setShowModal} />

      <Portal>
        <SectionModal
          isSectionShown={isSectionShown}
          setHideModal={setHideModal}
          progress={videoProgress}
        />
        <VideoItemProgressBar
          length={videoLength}
          progress={videoProgress}
          setIsPaused={setIsSeekingPaused}
          setIsScrollEnabled={setIsScrollEnabled}
          videoRef={videoRef}
        />
      </Portal>
    </PaperProvider>
  );
};

export default memo(VideoListing);
