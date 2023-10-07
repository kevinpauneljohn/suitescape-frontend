import React from 'react';
import {View} from 'react-native';
import style from './ButtonSocialActionsViewStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../assets/Colors';
import ButtonSocialAction from '../ButtonSocialAction/ButtonSocialAction';

const ButtonSocialActionsView = ({isLiked, onLike, onChatNow, onShare}) => {
  const socialButtons = [
    {
      name: isLiked ? 'heart' : 'heart-o',
      label: isLiked ? 'Liked' : 'Like',
      color: 'red',
      IconComponent: FontAwesome,
      onPress: onLike,
    },
    {
      name: 'comment-o',
      label: 'Chat Now',
      color: 'orange',
      IconComponent: FontAwesome,
      onPress: onChatNow,
    },
    {
      name: 'share-outline',
      label: 'Share',
      color: Colors.blue,
      IconComponent: MaterialCommunityIcons,
      onPress: onShare,
    },
  ];

  return (
    <View style={style.socialButtonContainer}>
      <>
        {socialButtons.map((button, index) => (
          <ButtonSocialAction key={index} {...button} />
        ))}
      </>
    </View>
  );
};

export default ButtonSocialActionsView;
