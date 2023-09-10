import {StyleSheet} from 'react-native';
import globalStyles from '../../assets/styles/globalStyles';

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  textContainer: {
    color: globalStyles.themeColor,
    flex: 1,
  },
  text: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default style;
