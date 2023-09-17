import React, {memo} from 'react';
import {View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import style from './VideoItemIconViewStyles';
import VideoItemIcon from '../VideoItemIcon/VideoItemIcon';

const iconsData = [
  {
    Component: AntDesign,
    name: 'heart',
    label: 'Likes', // dynamic, so you'll pass it as a prop
    size: 30,
    color: 'white',
  },
  {
    Component: AntDesign,
    name: 'wechat',
    label: 'Chat',
    size: 30,
    color: 'white',
  },
  {
    Component: Foundation,
    name: 'info',
    label: 'View',
    size: 30,
    color: 'white',
  },
  {
    Component: Icon,
    name: 'bookmark',
    label: 'Save',
    size: 30,
    color: 'white',
  },
  {
    Component: MaterialCommunityIcons,
    name: 'format-list-bulleted-type',
    label: 'Section',
    size: 30,
    color: 'white',
  },
];

const VideoItemIconView = ({likes}) => {
  return (
    <View style={style.mainContainer}>
      <>
        {iconsData.map((icon, index) => {
          const label = icon.label === 'Likes' ? likes : icon.label;
          return (
            <VideoItemIcon
              key={index}
              Component={icon.Component}
              name={icon.name}
              size={icon.size}
              color={icon.color}
              label={label}
            />
          );
        })}
      </>
    </View>
  );
};

export default memo(VideoItemIconView);
