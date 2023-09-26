import React, {memo, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import style from './VideoItemDetailsStyles';
import StarRating from 'react-native-star-rating-widget';

const VideoItemDetails = ({name, location, rating, price}) => {
  const [isDetailed, setIsDetailed] = useState(false);

  return (
    <Pressable
      style={style.container}
      onPress={() => setIsDetailed(prevState => !prevState)}>
      <Text
        style={{...style.text, ...style.nameText}}
        numberOfLines={isDetailed ? undefined : 1}>
        {name}
      </Text>
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
      <Text
        style={{...style.text, ...style.locationText}}
        numberOfLines={isDetailed ? undefined : 1}>
        {location}
      </Text>
      <Text style={{...style.text, ...style.priceText}}>
        P{price} Per night
      </Text>
    </Pressable>
  );
};

export default memo(VideoItemDetails);
