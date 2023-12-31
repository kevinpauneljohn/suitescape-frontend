import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';
import style from './VideoItemProgressBarStyles';

const VideoItemProgressBar = ({
  length,
  progress,
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

  const onValueChange = val => {
    onSeek();
    videoRef.current.seek(val[0], 0);
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
        onValueChange={onValueChange}
        onSlidingStart={onSlidingStart}
        onSlidingComplete={onSlidingComplete}
        maximumValue={length}
        minimumTrackTintColor={undefined}
        maximumTrackTintColor={'white'}
        trackStyle={style.track}
        thumbStyle={isSeeking ? style.thumb : style.noThumb}
        containerStyle={style.sliderContainer}
        trackMarks={[length]}
        renderTrackMarkComponent={() => {
          return <View style={style.trackMark} />;
        }}
      />
    </View>
  );
};

export default VideoItemProgressBar;
