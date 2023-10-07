import {StyleSheet} from 'react-native';
import {Colors} from '../../assets/Colors';

const style = StyleSheet.create({
  mainContainer: {
    height: 50,
    marginHorizontal: 30,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 10,
    justifyContent: 'center',
  },
  secondaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 60,
  },
  iconContainer: {
    alignItems: 'center',
    width: 40,
    marginRight: 8,
  },
  text: {
    marginLeft: 10,
    color: Colors.gray,
    fontFamily: 'Roboto-Bold',
    fontSize: 15,
  },
});

export default style;
