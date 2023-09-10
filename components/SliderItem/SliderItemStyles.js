import {PixelRatio, StyleSheet} from 'react-native';
import globalStyles from '../../assets/styles/globalStyles';

const imagePixelSize = PixelRatio.getPixelSizeForLayoutSize(120);

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    justifyContent: 'center',
    width: imagePixelSize,
    height: imagePixelSize,
  },
  title: {
    color: globalStyles.themeColor,
    fontFamily: 'Roboto',
    textAlign: 'center',
    fontSize: 20,
    paddingVertical: 30,
  },
});

export default style;
