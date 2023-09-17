import React, {memo, useState} from 'react';
import {View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import style from './VideoItemIconViewStyles';
import VideoItemIcon from '../VideoItemIcon/VideoItemIcon';

const VideoItemIconView = ({likes}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const iconsConfig = [
    {
      IconComponent: AntDesign,
      name: 'heart',
      label: likes,
      color: isLiked ? 'red' : 'white',
      onPress: () => setIsLiked(prevState => !prevState),
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
      color: isSaved ? 'yellow' : 'white',
      onPress: () => setIsSaved(prevState => !prevState),
    },
    {
      IconComponent: MaterialCommunityIcons,
      name: 'format-list-bulleted-type',
      label: 'Section',
      onPress: () => console.log('Section'),
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
