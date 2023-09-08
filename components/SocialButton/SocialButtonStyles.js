import {StyleSheet} from 'react-native';
import {Colors} from '../../assets/Colors';

const style = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 30,
    paddingVertical: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 10,
  },
  secondaryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginLeft: 10,
    color: 'gray',
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
  },
});

export default style;
