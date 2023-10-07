import React, {memo} from 'react';
import {Pressable, Text, View} from 'react-native';
import {Avatar} from 'react-native-paper';
import StarRatingView from '../StarRatingView/StarRatingView';
import {pressedBgColor} from '../../assets/styles/globalStyles';
import style from './SliderReviewItemStyles';

const SliderReviewItem = ({item, itemWidth, itemMargin}) => {
  return (
    <Pressable
      onPress={() => console.log('Review item')}
      style={({pressed}) => ({
        width: itemWidth,
        marginRight: itemMargin,
        ...style.mainContainer,
        ...pressedBgColor(pressed),
      })}>
      <View style={style.userContainer}>
        <Avatar.Image source={item.img} size={50} style={style.avatar} />
        <View style={style.userNameContainer}>
          <Text style={style.userName} numberOfLines={1}>
            {item.title}
          </Text>
          <StarRatingView starSize={15} rating={3} />
        </View>
      </View>
      <View style={style.reviewContainer}>
        <Text>
          {Array(10)
            .fill(null)
            .map(() => item.title)
            .toString()}
        </Text>
      </View>
    </Pressable>
  );
};

export default memo(SliderReviewItem);
