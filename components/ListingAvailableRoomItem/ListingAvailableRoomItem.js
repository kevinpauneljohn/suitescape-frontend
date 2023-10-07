import React from 'react';
import {Image, Text, View} from 'react-native';
import StarRatingView from '../StarRatingView/StarRatingView';
import CouponBadge from '../CouponBadge/CouponBadge';
import {Colors} from '../../assets/Colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ButtonLink from '../ButtonLink/ButtonLink';
import ButtonLarge from '../ButtonLarge/ButtonLarge';
import ButtonOutlined from '../ButtonOutlined/ButtonOutlined';

const ListingAvailableRoomItem = ({title, img}) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        marginTop: 12,
        paddingTop: 18,
        paddingBottom: 20,
        paddingHorizontal: 20,
      }}>
      <CouponBadge>50% Off</CouponBadge>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Image
          source={img}
          style={{
            width: 125,
            height: 125,
            backgroundColor: 'lightgray',
            borderRadius: 10,
            marginRight: 14,
          }}
        />
        <View
          style={{
            marginRight: 50,
            flex: 1,
          }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              marginBottom: 8,
            }}>
            {title}
          </Text>
          <Text style={{fontSize: 10}}>{title}</Text>

          <View style={{marginVertical: 8}}>
            <StarRatingView />
          </View>

          <View>
            <Text style={{color: Colors.red, fontSize: 10, marginBottom: 10}}>
              Non - Refundable
            </Text>
            <Text style={{color: Colors.red, fontSize: 10, marginBottom: 10}}>
              Payment First
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingTop: 15,
          justifyContent: 'space-between',
        }}>
        <View>
          <Text
            style={{
              color: Colors.blue,
              fontWeight: 'bold',
              fontSize: 16,
              marginVertical: 8,
            }}>
            Single Room
          </Text>
          <Text style={{fontSize: 10, marginBottom: 10}}>
            Bed Size: Queen size bed
          </Text>
          <Text style={{fontSize: 10, marginBottom: 10}}>
            Room Size: 100 Sqm
          </Text>
          <Text style={{fontSize: 10, marginBottom: 10}}>
            Good for: 3-5 Person
          </Text>
          <Text style={{fontSize: 10, marginBottom: 10}}>Others...</Text>
        </View>

        <View>
          <Text
            style={{
              color: Colors.blue,
              fontWeight: 'bold',
              fontSize: 16,
              marginVertical: 8,
            }}>
            Amenities
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 10, marginBottom: 10, marginRight: 50}}>
              Free Wifi
            </Text>
            <View style={{alignItems: 'center', width: 20}}>
              <Icon name={'wifi'} size={13} color={Colors.blue} />
            </View>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 10, marginBottom: 10, marginRight: 50}}>
              Air Conditioning
            </Text>
            <View style={{alignItems: 'center', width: 20}}>
              <Icon name={'snowflake'} size={13} color={Colors.blue} />
            </View>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 10, marginBottom: 10, marginRight: 50}}>
              Toiletries
            </Text>
            <View style={{alignItems: 'center', width: 20}}>
              <Icon name={'pump-soap'} size={13} color={Colors.blue} />
            </View>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 10, marginBottom: 10, marginRight: 80}}>
              Others...
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: Colors.gray,
          marginTop: 15,
          marginBottom: 15,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 5,
        }}>
        <Text style={{fontSize: 12, marginBottom: 10}}>Price Per Night</Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              textDecorationLine: 'line-through',
              opacity: 0.6,
              marginRight: 5,
              fontSize: 12,
            }}>
            P2500
          </Text>
          <Text>P1500</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 5,
        }}>
        <ButtonLink textStyle={{fontSize: 12}}>Tax and charges</ButtonLink>
        <Text style={{fontSize: 12}}>P300</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 8,
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Total</Text>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>P1800</Text>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: Colors.gray,
          marginTop: 15,
          marginBottom: 15,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 4,
          marginBottom: 15,
        }}>
        <ButtonOutlined containerStyle={{paddingHorizontal: 40}}>
          Select Room
        </ButtonOutlined>
        <ButtonOutlined containerStyle={{paddingHorizontal: 40}}>
          Select Dates
        </ButtonOutlined>
      </View>
      <ButtonLarge>Select</ButtonLarge>
    </View>
  );
};

export default ListingAvailableRoomItem;
