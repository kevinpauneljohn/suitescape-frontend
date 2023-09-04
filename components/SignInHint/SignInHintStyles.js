import {StyleSheet} from 'react-native';
import {Colors} from '../../assets/Colors';

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 14,
    paddingRight: 4,
  },
  link: {
    color: Colors.blue,
  },
});

export default style;
