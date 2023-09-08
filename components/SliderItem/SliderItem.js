import React from 'react';
import {Image, Text, View} from 'react-native';
import style from './SliderItemStyles';

const SliderItem = ({title, img, width}) => {
  return (
    <View
      style={{
        width,
        ...style.container,
      }}>
      <Image style={style.image} source={img} />
      <Text style={style.title}>{title}</Text>
    </View>
  );
};

export default SliderItem;
