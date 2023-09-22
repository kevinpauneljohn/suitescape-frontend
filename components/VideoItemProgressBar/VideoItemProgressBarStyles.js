import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    zIndex: 2,
    backgroundColor: 'transparent',
    left: 0,
    right: 0,
    bottom: 0,
  },
  sliderContainer: {
    height: 25,
  },
  track: {
    height: 6,
  },
  thumb: {
    height: 15,
    width: 15,
  },
  noThumb: {
    height: 0,
    width: 0,
  },
  trackMark: {
    width: 5,
    height: 6,
    backgroundColor: 'white',
    borderRadius: 1,
    marginLeft: 1,
    marginRight: 1,
  },
});

export default style;
