import {StyleSheet} from 'react-native';
import globalStyles from '../../assets/styles/globalStyles';

const style = StyleSheet.create({
  text: {
    color: globalStyles.themeColor,
    fontFamily: 'Roboto-Bold',
    fontSize: 25,
    lineHeight: 30,
    paddingVertical: 20,
  },
  container: {
    flex: 1,
  },
});

export default style;
