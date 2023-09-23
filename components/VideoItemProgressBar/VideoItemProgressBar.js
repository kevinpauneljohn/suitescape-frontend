import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';
import style from './VideoItemProgressBarStyles';

const VideoItemProgressBar = ({
  progress,
  duration,
  setIsPaused,
  setIsScrollEnabled,
  videoRef,
}) => {
  const [isSeeking, setIsSeeking] = useState(false);
  const timeoutRef = useRef(null);

  const onSeek = () => {
    setIsSeeking(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsSeeking(false);
    }, 1500);
  };

  const onSlidingStart = () => {
    setIsScrollEnabled(false);
    setIsPaused(true);
  };

  const onSlidingComplete = () => {
    setIsScrollEnabled(true);
    setIsPaused(false);
  };

  return (
    <View style={style.mainContainer}>
      <Slider
        value={progress}
        onValueChange={val => {
          onSeek();
          videoRef.current.seek(val[0]);
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
