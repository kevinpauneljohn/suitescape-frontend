import React, {memo} from 'react';
import {Text, View} from 'react-native';
import {Colors} from '../../assets/Colors';
import style from './ListingFeatureRowStyles';

const ListingFeatureRow = ({featureName, featureData}) => {
  if (!featureData[featureName]) {
    return null;
  }

  const {name, icon, iconSize, IconLibrary} = featureData[featureName];

  return (
    <View style={style.mainContainer}>
      <Text style={style.text}>{name}</Text>
      <View style={style.iconContainer}>
        <IconLibrary name={icon} size={iconSize} color={Colors.blue} />
      </View>
    </View>
  );
};

export default memo(ListingFeatureRow);
