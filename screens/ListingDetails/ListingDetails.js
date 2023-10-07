import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRatingView from '../../components/StarRatingView/StarRatingView';
import ButtonLink from '../../components/ButtonLink/ButtonLink';
import SliderListingGallery from '../../components/SliderListingGallery/SliderListingGallery';
import ButtonSocialActionsView from '../../components/ButtonSocialActionsView/ButtonSocialActionsView';
import ButtonLarge from '../../components/ButtonLarge/ButtonLarge';
import SliderReviews from '../../components/SliderReviews/SliderReviews';
import AvatarSample from '../../components/AvatarSample/AvatarSample';
import ButtonIconRow from '../../components/ButtonIconRow/ButtonIconRow';
import parseListing from '../../utilities/parseListing';
import parseHost from '../../utilities/parseHost';
import style from './ListingDetailsStyles';
import globalStyles, {pressedBgColor} from '../../assets/styles/globalStyles';
import ListingFeaturesView, {
  FEATURES,
} from '../../components/ListingFeaturesView/ListingFeaturesView';
import LongText from '../../components/LongText/LongText';
import {Routes} from '../../navigation/Routes';
import SuitescapeAPI from '../../services/SuitescapeAPI';
import {handleApiError, handleApiResponse} from '../../utilities/apiHelpers';
import AppHeader from '../../components/AppHeader/AppHeader';
import AppFooter from '../../components/AppFooter/AppFooter';
import CouponBadge from '../../components/CouponBadge/CouponBadge';

const AMENITIES_IN_VIEW = 5;
const REVIEWS_IN_VIEW = 6;

const sampleNearby = [
  {id: 1, name: 'restaurant'},
  {id: 2, name: 'mall'},
  {id: 3, name: 'hospital'},
  {id: 4, name: 'bank'},
  {id: 5, name: 'church'},
];

const ListingDetails = ({route, navigation}) => {
  const [hostData, setHostData] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [videoData, setVideoData] = useState(null);
  const [reviewsData, setReviewsData] = useState(null);

  const listing = parseListing(route.params);

  const hostJoinedDate =
    hostData?.createdAt &&
    new Date(hostData.createdAt).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
    });

  const hostListings =
    hostData &&
    hostData.listingsCount +
      ' ' +
      (hostData.listingsCount > 1 ? 'Listings' : 'Listing');

  const fetchListingData = async () => {
    try {
      const response = await SuitescapeAPI.get(`/listings/${listing.id}`);
      handleApiResponse({
        response,
        onSuccess: ({host, images, videos, reviews}) => {
          setHostData(parseHost(host));
          setImageData(images);
          setVideoData(videos);
          setReviewsData(reviews);
        },
      });
    } catch (err) {
      handleApiError({error: err, defaultAlert: true});
    }
  };

  useEffect(() => {
    fetchListingData().catch(() => {});
  }, []);

  return (
    <View style={globalStyles.flexFull}>
      <AppHeader>Listing Details</AppHeader>

      <ScrollView>
        <SliderListingGallery
          listingId={listing.id}
          imageData={imageData}
          videoData={videoData}
        />
        {/* Title */}
        <View
          style={{
            ...style.plainContainer,
            ...style.titleContainer,
          }}>
          <CouponBadge>50% Off</CouponBadge>

          <Text style={style.largeHeaderText}>{listing.name}</Text>

          {/* Ratings */}
          <View style={style.ratingsContainer}>
            <StarRatingView rating={3.5} textStyle={style.text} />

            {/* Reviews */}
            <View style={style.reviewsContainer}>
              <ButtonLink textStyle={style.ratingsText}>
                100k Reviews
              </ButtonLink>
            </View>
          </View>
        </View>

        {/* Price */}
        <View style={style.container}>
          <Text style={style.headerText}>Package Price</Text>
          <Text style={style.text}>P{listing.price} per night</Text>
        </View>

        {/* Host Profile */}
        <View style={style.plainContainer}>
          <View style={style.hostContentContainer}>
            <AvatarSample />

            <View style={style.hostDetailsContainer}>
              {/* Host Name */}
              <ButtonLink
                textStyle={{
                  ...style.hostNameText,
                }}>
                {hostData ? hostData.firstname : 'Loading...'}
              </ButtonLink>

              {/* Joined Date */}
              <Text
                style={{
                  ...style.text,
                  ...style.joinedDateText,
                }}>
                Joined in {hostJoinedDate}
              </Text>

              {/* Response Rate */}
              <View style={style.responseContainer}>
                <Text style={{...style.text, ...style.responseText}}>
                  Response Rate: 95%
                </Text>
                <Text style={{...style.text, ...style.responseText}}>
                  Response Time: within an hour
                </Text>
                <Text style={{...style.text, ...style.responseText}}>
                  Language: English
                </Text>
              </View>
            </View>

            {/* Host Listings */}
            <ButtonLink>{hostListings}</ButtonLink>
          </View>

          {/* Listing Actions */}
          <ButtonSocialActionsView isLiked={listing.isLiked} />
        </View>

        {/* Description */}
        <View style={style.container}>
          <Text style={style.headerText}>Description</Text>
          <LongText textStyle={style.text}>
            {
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
            }
          </LongText>
        </View>

        {/* Location */}
        <View style={style.container}>
          <Text style={style.headerText}>Location</Text>
          <Pressable
            style={({pressed}) => ({
              ...style.locationContainer,
              ...pressedBgColor(pressed),
            })}
          />
        </View>

        {/* Places Nearby */}
        <View style={style.container}>
          <Text style={style.headerText}>Places Nearby</Text>
          <ListingFeaturesView
            feature={FEATURES.placesNearby}
            data={sampleNearby}
            size={AMENITIES_IN_VIEW}
          />
          {sampleNearby?.length > 0 && (
            <View style={style.amenitiesSeeAllContainer}>
              <ButtonLink textStyle={style.seeAllText}>See All</ButtonLink>
            </View>
          )}
        </View>

        {/* Reviews */}
        <View style={style.container}>
          <View style={style.reviewsHeaderContainer}>
            <Text style={style.headerText}>Reviews</Text>
            {reviewsData?.length > 0 && (
              <View style={style.reviewsSeeAllContainer}>
                <ButtonLink textStyle={style.seeAllText}>See All</ButtonLink>
              </View>
            )}
          </View>
          <SliderReviews reviews={reviewsData} size={REVIEWS_IN_VIEW} />
        </View>

        {/* Report Listing */}
        <View style={{...style.container, ...style.reportContainer}}>
          <ButtonIconRow
            onPress={() => console.log('Report this listing')}
            renderIcon={() => <Icon name={'flag-o'} size={25} color={'red'} />}
            textStyle={style.reportText}>
            Report this listing
          </ButtonIconRow>
        </View>
      </ScrollView>

      <AppFooter>
        <ButtonLarge
          onPress={() => navigation.navigate(Routes.CHECK_AVAILABILITY)}>
          Check Availability
        </ButtonLarge>
      </AppFooter>
    </View>
  );
};

export default ListingDetails;
