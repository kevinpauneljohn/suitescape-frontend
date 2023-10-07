import React, {memo, useState} from 'react';
import {Alert, Pressable, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import style from './VideoListingIconsViewStyles';
import VideoListingIcon from '../VideoListingIcon/VideoListingIcon';
import SuitescapeAPI from '../../services/SuitescapeAPI';
import {userStorage} from '../../storage/userStorage';
import {handleApiError, handleApiResponse} from '../../utilities/apiHelpers';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../navigation/Routes';
import AvatarSample from '../AvatarSample/AvatarSample';
import {pressedOpacity} from '../../assets/styles/globalStyles';

const VideoListingIconsView = ({listing, setShowModal}) => {
  const [isLiked, setIsLiked] = useState(listing.isLiked);
  const [isSaved, setIsSaved] = useState(listing.isSaved);
  const [videoLikes, setVideoLikes] = useState(listing.likes);

  const navigation = useNavigation();

  const token = userStorage.getString('token');

  const handleLike = () => {
    SuitescapeAPI.post(
      `/listings/${listing.id}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then(response =>
        handleApiResponse({
          response,
          onSuccess: ({liked}) => {
            setIsLiked(liked);
            setVideoLikes(liked ? videoLikes + 1 : videoLikes - 1);
          },
        }),
      )
      .catch(err => handleApiError({error: err, defaultAlert: true}));
  };

  const handleSave = () => {
    SuitescapeAPI.post(
      `/listings/${listing.id}/save`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then(res =>
        handleApiResponse({
          response: res,
          onSuccess: ({saved}) => {
            setIsSaved(saved);
          },
        }),
      )
      .catch(err =>
        handleApiError({
          error: err,
          handleErrors: errors => Alert.alert(errors.message),
        }),
      );
  };

  const iconsConfig = [
    {
      IconComponent: AntDesign,
      name: 'heart',
      label: videoLikes,
      color: isLiked ? 'red' : 'white',
      onPress: handleLike,
    },
    {
      IconComponent: Foundation,
      name: 'info',
      label: 'View',
      onPress: () => navigation.navigate(Routes.LISTING_DETAILS, {listing}),
    },
    {
      IconComponent: Icon,
      name: 'bookmark',
      label: isSaved ? 'Added to Saves' : 'Save',
      color: isSaved ? 'gold' : 'white',
      onPress: handleSave,
    },
    {
      IconComponent: MaterialCommunityIcons,
      name: 'format-list-bulleted-type',
      label: 'Section',
      onPress: setShowModal,
    },
  ];

  return (
    <View style={style.mainContainer}>
      <Pressable style={({pressed}) => pressedOpacity(pressed, 0.8)}>
        <AvatarSample fill={'rgba(0,0,0,0.5)'} size={35}>
          Profile
        </AvatarSample>
        <Text style={style.text}>Profile</Text>
      </Pressable>
      <>
        {iconsConfig.map((config, index) => (
          <View key={index}>
            <VideoListingIcon {...config} />
            <Text style={style.text}>{config.label}</Text>
          </View>
        ))}
      </>
    </View>
  );
};

export default memo(VideoListingIconsView);
