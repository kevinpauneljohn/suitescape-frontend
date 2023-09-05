import {StyleSheet} from 'react-native';
import {Colors} from '../../assets/Colors';

const style = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 10,
    marginHorizontal: 28,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    paddingHorizontal: 25,
    flex: 1,
  },
  eyeContainer: {
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});

export default style;
