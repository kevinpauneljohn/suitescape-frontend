import React, {memo} from 'react';
import {Image, useWindowDimensions} from 'react-native';
import {baseURL} from '../../services/SuitescapeAPI';
import VideoItem from '../VideoItem/VideoItem';

const SliderGalleryItem = ({listingId, mediaId, type, height}) => {
  const {width} = useWindowDimensions();

  return type === 'image' ? (
    <Image
      source={{uri: `${baseURL}/listings/${listingId}/images/${mediaId}`}}
      style={{width}}
      resizeMode={'cover'}
    />
  ) : type === 'video' ? (
    <VideoItem
      videoId={mediaId}
      width={width}
      height={height}
      popUpIconSize={40}
      isInitialPaused={false}
      isInitialMuted={true}
    />
  ) : null;
};

export default memo(SliderGalleryItem);
