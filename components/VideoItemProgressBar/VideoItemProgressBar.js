import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';
import style from './VideoItemProgressBarStyles';

const VideoItemProgressBar = ({progress, duration, setIsPaused, videoRef}) => {
  const [isSeeking, setIsSeeking] = useState(false);
  const timeoutRef = useRef(null);

  const handleOnSeek = () => {
    setIsSeeking(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsSeeking(false);
    }, 1500);
  };

  const onSlidingStart = () => {
    setIsPaused(true);
  };

  const onSlidingComplete = () => {
    setIsPaused(false);
  };

  return (
    <View style={style.mainContainer}>
      <Slider
        value={progress}
        onValueChange={val => {
          videoRef.current.seek(val[0]);
          handleOnSeek();
        }}
        onSlidingStart={onSlidingStart}
        onSlidingComplete={onSlidingComplete}
        maximumValue={duration}
        minimumTrackTintColor={undefined}
        maximumTrackTintColor={'white'}
        trackStyle={style.track}
        thumbStyle={isSeeking ? style.thumb : style.noThumb}
        containerStyle={style.sliderContainer}
        trackMarks={[duration]}
        renderTrackMarkComponent={() => {
          return <View style={style.trackMark} />;
        }}
      />
    </View>
  );
};

export default VideoItemProgressBar;
