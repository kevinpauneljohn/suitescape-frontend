import React, {memo} from 'react';
import {Text, View} from 'react-native';
import style from './VideoListingDetailsStyles';
import StarRatingView from '../StarRatingView/StarRatingView';
import ButtonLink from '../ButtonLink/ButtonLink';
import LongText from '../LongText/LongText';

const VideoListingDetails = ({name, location, rating, price}) => {
  return (
    <View style={style.container}>
      <ButtonLink
        textStyle={{
          ...style.text,
          ...style.nameText,
        }}
        numberOfLines={1}>
        {name}
      </ButtonLink>
      <StarRatingView
        rating={rating}
        textStyle={{...style.text, ...style.ratingText}}
      />
      <LongText
        charLimit={40}
        textStyle={{
          ...style.text,
          ...style.locationText,
        }}>
        {location}
      </LongText>
      <Text
        style={{
          ...style.text,
          ...style.priceText,
        }}>
        P{price} Per night
      </Text>
    </View>
  );
};

export default memo(VideoListingDetails);
