import {Platform, StyleSheet} from 'react-native';
import {Colors} from '../../assets/Colors';

const style = StyleSheet.create({
  skipButton: {
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButtonText: {
    color: Colors.blue,
    fontFamily: 'Roboto',
    fontSize: 15,
    paddingTop: Platform.OS === 'android' ? 3 : 0,
  },
});

export default style;
