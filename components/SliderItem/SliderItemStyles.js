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
    color: 'black',
    fontSize: 20,
    paddingVertical: 30,
  },
});

export default style;
