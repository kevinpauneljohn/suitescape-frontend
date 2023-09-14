import React from 'react';
import {Image, Text, useWindowDimensions, View} from 'react-native';
import style from './SliderItemStyles';
import {useTheme} from '@react-navigation/native';

const SliderItem = ({title, img}) => {
  const {width} = useWindowDimensions();
  const {colors} = useTheme();

  return (
    <View style={{width, ...style.container}}>
      <Image style={style.image} source={img} />
      <Text
        style={{
          color: colors.text,
          ...style.title,
        }}>
        {title}
      </Text>
    </View>
  );
};

export default SliderItem;
