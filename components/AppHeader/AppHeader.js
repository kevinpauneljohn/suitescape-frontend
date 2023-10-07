import React, {memo} from 'react';
import {Text, View} from 'react-native';
import ButtonBack from '../ButtonBack/ButtonBack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import style from './AppHeaderStyles';

const AppHeader = ({children, textStyle}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View
      style={{
        ...style.headerContainer,
        paddingTop: insets.top + 5,
      }}>
      <ButtonBack onPress={() => navigation.goBack()} color={'black'} />
      <Text style={{...style.text, ...textStyle}}>{children}</Text>
    </View>
  );
};

export default memo(AppHeader);
