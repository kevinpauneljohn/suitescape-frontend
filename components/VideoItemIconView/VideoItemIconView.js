import React, {memo, useState} from 'react';
import {Alert, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import style from './VideoItemIconViewStyles';
import VideoItemIcon from '../VideoItemIcon/VideoItemIcon';
import SuitescapeAPI from '../../services/SuitescapeAPI';
import {userStorage} from '../../storage/userStorage';
import {handleApiError, handleApiResponse} from '../../utilities/apiHelpers';

const VideoItemIconView = ({
  id,
  likes,
  isVideoLiked,
  isVideoSaved,
  setShowModal,
}) => {
  const [videoLikes, setVideoLikes] = useState(likes);
  const [isLiked, setIsLiked] = useState(isVideoLiked);
  const [isSaved, setIsSaved] = useState(isVideoSaved);

  const token = userStorage.getString('token');

  const handleLike = () => {
    SuitescapeAPI.post(
      `/videos/${id}/like`,
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
      .catch(err => handleApiError(err));
  };

  const handleSave = () => {
    SuitescapeAPI.post(
      `/videos/${id}/save`,
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
      .catch(err => handleApiError(err));
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
      IconComponent: AntDesign,
      name: 'wechat',
      label: 'Chat',
      onPress: () => console.log('Chat'),
    },
    {
      IconComponent: Foundation,
      name: 'info',
      label: 'View',
      onPress: () => console.log('View'),
    },
    {
      IconComponent: Icon,
      name: 'bookmark',
      label: 'Save',
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
      <>
        {iconsConfig.map((config, index) => (
          <VideoItemIcon key={index} {...config} />
        ))}
      </>
    </View>
  );
};

export default memo(VideoItemIconView);
