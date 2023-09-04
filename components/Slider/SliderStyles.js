import {StyleSheet} from 'react-native';
import {Colors} from '../../assets/Colors';

const style = StyleSheet.create({
  nextButtonText: {
    color: 'white',
    fontFamily: 'Inter-Medium',
    fontSize: 20,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  signInContentText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    paddingRight: 2,
  },
  link: {
    color: Colors.blue,
  },
});

export default style;
