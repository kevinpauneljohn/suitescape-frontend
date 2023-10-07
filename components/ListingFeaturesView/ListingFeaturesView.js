import React, {memo, useEffect, useState} from 'react';
import ListingFeatureRow from '../ListingFeatureRow/ListingFeatureRow';
import {FlatList, Text, View} from 'react-native';
import style from './ListingFeaturesViewStyles';
import amenitiesData from '../../data/amenitiesData';
import placesNearbyData from '../../data/placesNearbyData';
import globalStyles from '../../assets/styles/globalStyles';

export const FEATURES = {
  amenities: 'amenities',
  placesNearby: 'places nearby',
};

const featureData = {
  [FEATURES.amenities]: amenitiesData,
  [FEATURES.placesNearby]: placesNearbyData,
};

const ListingFeaturesView = ({feature, data, size = 5, fullMode = false}) => {
  const [validFeatures, setValidFeatures] = useState([]);

  const getValidFeatures = args => {
    if (!args) {
      return [];
    }
    const validator = featureData[feature];
    return args.filter(({name}) => validator[name]);
  };

  useEffect(() => {
    setValidFeatures(getValidFeatures(data));
  }, [data]);

  return (
    <View style={data?.length > 0 && style.container}>
      <FlatList
        scrollEnabled={fullMode}
        data={fullMode ? validFeatures : validFeatures.slice(0, size)}
        renderItem={({item}) => (
          <ListingFeatureRow
            featureName={item.name}
            featureData={featureData[feature]}
          />
        )}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={globalStyles.emptyText}>No {feature} yet.</Text>
        }
      />
    </View>
  );
};

export default memo(ListingFeaturesView);
