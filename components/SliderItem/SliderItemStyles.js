import {PixelRatio, StyleSheet} from 'react-native';

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
    fontFamily: 'Roboto',
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 30,
    paddingBottom: 15,
  },
});

export default style;
