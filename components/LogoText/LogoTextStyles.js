import {StyleSheet} from 'react-native';
import globalStyles from '../../assets/styles/globalStyles';

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 40,
    paddingBottom: 10,
  },
  logoText: {
    color: globalStyles.themeColor,
    fontFamily: 'Poppins',
    letterSpacing: 0.15,
    fontSize: 40,
    textTransform: 'uppercase',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default style;
