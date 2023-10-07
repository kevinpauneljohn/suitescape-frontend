import React, {memo} from 'react';
import {Text, View} from 'react-native';
import style from './StarRatingViewStyles';
import StarRating from 'react-native-star-rating-widget';

const StarRatingView = ({rating, starSize = 20, textStyle}) => {
  return (
    <View style={style.ratingContainer}>
      <View style={style.starRatingContainer}>
        <StarRating
          rating={rating}
          onChange={() => {}}
          enableSwiping={false}
          enableHalfStar={true}
          starSize={starSize}
          animationConfig={{scale: 1}}
          starStyle={style.starRating}
        />
      </View>
      <Text style={{...style.ratingText, ...textStyle}}>{rating}</Text>
    </View>
  );
};

export default memo(StarRatingView);
