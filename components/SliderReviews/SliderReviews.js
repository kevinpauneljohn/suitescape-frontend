import React, {memo} from 'react';
import {Text, useWindowDimensions, View} from 'react-native';
import Slider from '../Slider/Slider';
import SliderReviewItem from '../SliderReviewItem/SliderReviewItem';
import style from './SliderReviewsStyles';
import globalStyles from '../../assets/styles/globalStyles';

const SliderReviews = ({reviews, size = 5}) => {
  const {width} = useWindowDimensions();

  const itemWidth = width - 120;
  const itemMargin = 15;

  return (
    <View style={reviews?.length > 0 && style.container}>
      <Slider
        data={reviews?.slice(0, size)}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          <SliderReviewItem
            item={item}
            itemWidth={itemWidth}
            itemMargin={itemMargin}
          />
        )}
        snapToInterval={itemWidth + itemMargin}
        bounces={true}
        ListEmptyComponent={
          <Text style={globalStyles.emptyText}>No reviews yet.</Text>
        }
      />
    </View>
  );
};

export default memo(SliderReviews);
