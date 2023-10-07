import {StyleSheet} from 'react-native';
import {Colors} from '../../assets/Colors';

const style = StyleSheet.create({
  mainContainer: {
    height: 250,
    backgroundColor: Colors.lightgray,
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: 'transparent',
  },
  userNameContainer: {
    flex: 1,
    marginTop: 5,
    marginLeft: 8,
    marginRight: 16,
  },
  userName: {
    color: 'black',
    paddingLeft: 4,
    marginBottom: 5,
  },
  reviewContainer: {
    flex: 1,
    marginTop: 15,
    marginRight: 10,
  },
});

export default style;
