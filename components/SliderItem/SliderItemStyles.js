import {Appearance, PixelRatio, StyleSheet} from 'react-native';

const imagePixelSize = PixelRatio.getPixelSizeForLayoutSize(120);
const colorScheme = Appearance.getColorScheme();

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
    color: colorScheme === 'dark' ? 'white' : 'black',
    fontSize: 20,
    paddingVertical: 30,
  },
});

export default style;
