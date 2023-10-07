import React, {memo, useRef, useState} from 'react';
import Slider from '../Slider/Slider';
import {Text, useWindowDimensions, View} from 'react-native';
import style from './SliderListingGalleryStyles';
import SliderGalleryItem from '../SliderGalleryItem/SliderGalleryItem';
import ButtonGalleryMode from '../ButtonGalleryMode/ButtonGalleryMode';

const GALLERY_HEIGHT = 400;

const SliderListingGallery = ({listingId, imageData, videoData}) => {
  const [index, setIndex] = useState(0);
  const [isPhoto, setIsPhoto] = useState(false);

  const sliderRef = useRef(null);
  const {width} = useWindowDimensions();

  const galleryData = isPhoto ? imageData : videoData;

  const changeGalleryMode = mode => {
    const isPhotoMode = mode === 'image';

    if (galleryData?.length > 0) {
      sliderRef.current.scrollToIndex({index: 0, animated: false});
    }

    setIsPhoto(isPhotoMode);
    setIndex(0);
  };

  return (
    <View style={{height: GALLERY_HEIGHT}}>
      <Slider
        ref={sliderRef}
        index={index}
        onIndexChange={setIndex}
        data={galleryData}
        width={width}
        bounces={true}
        renderItem={({item}) => (
          <SliderGalleryItem
            listingId={listingId}
            mediaId={item.id}
            type={isPhoto ? 'image' : 'video'}
            height={GALLERY_HEIGHT}
            {...item}
          />
        )}
      />

      {/* Index */}
      {galleryData ? (
        <View style={style.indexContainer}>
          <Text style={style.text}>
            {index + 1}/{galleryData.length}
          </Text>
        </View>
      ) : null}

      {/* Mode Buttons */}
      <View style={style.modeContainer}>
        <ButtonGalleryMode
          mode={'video'}
          isPhoto={isPhoto}
          setGalleryMode={changeGalleryMode}
        />
        <ButtonGalleryMode
          mode={'image'}
          isPhoto={isPhoto}
          setGalleryMode={changeGalleryMode}
        />
      </View>
    </View>
  );
};

export default memo(SliderListingGallery);
