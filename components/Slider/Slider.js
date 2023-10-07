import React, {forwardRef} from 'react';
import {FlatList} from 'react-native';

const Slider = forwardRef(
  ({data, index, onIndexChange, width, ...props}, ref) => {
    const onScroll = e => {
      if (index === undefined) {
        return;
      }

      const offset = e.nativeEvent.contentOffset.x;
      const newIndex = Math.round(offset / width);
      if (newIndex === index || newIndex > data.length - 1 || newIndex < 0) {
        return;
      }

      onIndexChange(newIndex);
    };

    return (
      <FlatList
        ref={ref}
        data={data}
        initialScrollIndex={index}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        snapToAlignment={'center'}
        decelerationRate={'fast'}
        disableIntervalMomentum={true}
        bounces={false}
        onScroll={onScroll}
        {...props}
      />
    );
  },
);

export default Slider;
