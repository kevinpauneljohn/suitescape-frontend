import React, {memo} from 'react';
import {Text, View} from 'react-native';
import style from './VideoItemDetailsStyles';

const VideoItemDetails = ({name, location, stars, price}) => {
  return (
    <View style={style.container}>
      <Text style={{...style.text, ...style.bold}}>{name}</Text>
      <Text style={{...style.text, ...style.smallText}}>{location}</Text>
      <Text style={{...style.text, ...style.largeText}}>
        P{price} Per night
      </Text>
    </View>
  );
};

export default memo(VideoItemDetails);
