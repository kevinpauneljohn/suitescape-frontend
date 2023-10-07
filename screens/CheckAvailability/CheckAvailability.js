import React from 'react';
import AppHeader from '../../components/AppHeader/AppHeader';
import {FlatList, Text, View} from 'react-native';
import slideData from '../../data/slideData';
import ListingAvailableRoomItem from '../../components/ListingAvailableRoomItem/ListingAvailableRoomItem';
import AppFooter from '../../components/AppFooter/AppFooter';
import ButtonLarge from '../../components/ButtonLarge/ButtonLarge';

const CheckAvailability = () => {
  return (
    <View style={{flex: 1}}>
      <AppHeader>Check Availability</AppHeader>
      <FlatList
        data={slideData}
        renderItem={({item}) => <ListingAvailableRoomItem {...item} />}
      />
      <AppFooter>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{paddingLeft: 20}} />
          <ButtonLarge half={true}> Reserve</ButtonLarge>
        </View>
      </AppFooter>
    </View>
  );
};

export default CheckAvailability;
