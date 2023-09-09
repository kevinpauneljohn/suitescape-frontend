import {StyleSheet} from 'react-native';
import {DefaultTheme} from '@react-navigation/native';

const style = StyleSheet.create({
  text: {
    fontFamily: 'Roboto-Bold',
    fontSize: 25,
    lineHeight: 30,
    color: 'black',
    paddingVertical: 20,
  },
  container: {
    backgroundColor: DefaultTheme.colors.background,
    flex: 1,
  },
});

export default style;
