import {Platform, StyleSheet} from 'react-native';
import {Colors} from '../../assets/Colors';

const style = StyleSheet.create({
  skipButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.blue,
    marginRight: 27,
    marginTop: 20,
    paddingVertical: 3,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButtonText: {
    fontFamily: 'Roboto',
    fontSize: 15,
    color: Colors.blue,
    paddingTop: Platform.OS === 'android' ? 3 : 0,
  },
});

export default style;
