import React, {memo} from 'react';
import {Text, View} from 'react-native';
import style from './VideoItemDetailsStyles';
import StarRating from 'react-native-star-rating-widget';

const VideoItemDetails = ({name, location, rating, price}) => {
  return (
    <View style={style.container}>
      <Text style={{...style.text, ...style.bold}}>{name}</Text>
      <View style={style.ratingContainer}>
        <View style={style.starRatingContainer}>
          <StarRating
            rating={rating}
            onChange={() => {}}
            enableSwiping={false}
            enableHalfStar={true}
            starSize={20}
            animationConfig={{scale: 1}}
            starStyle={style.starRating}
          />
        </View>
        <Text style={{...style.text, ...style.ratingText}}>{rating}</Text>
      </View>
      <Text style={{...style.text, ...style.locationText}}>{location}</Text>
      <Text style={{...style.text, ...style.priceText}}>
        P{price} Per night
      </Text>
    </View>
  );
};

export default memo(VideoItemDetails);
