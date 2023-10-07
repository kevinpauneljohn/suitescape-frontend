import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  popUpContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  popUpOpacity: {
    opacity: 0.8,
  },
});

export default style;
