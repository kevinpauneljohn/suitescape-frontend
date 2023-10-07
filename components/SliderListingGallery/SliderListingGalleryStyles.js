import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  text: {
    color: 'white',
  },
  indexContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 13,
    bottom: 15,
    right: 15,
    alignSelf: 'center',
  },
  modeContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 13,
    bottom: 15,
    alignSelf: 'center',
    flexDirection: 'row',
  },
});

export default style;
