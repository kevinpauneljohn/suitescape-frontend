import {StyleSheet} from 'react-native';
import {Colors} from '../../assets/Colors';

const style = StyleSheet.create({
  button: {
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.blue,
  },
  text: {
    color: Colors.blue,
  },
});

export default style;
