import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerLeft: {
    marginTop: 10,
    marginLeft: 15,
  },
  headerRight: {
    marginRight: 26,
    marginTop: 23,
  },
  dot: {
    width: 15,
    height: 15,
    margin: 4,
    borderRadius: 10,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  nextButtonContainer: {
    marginTop: 30,
    marginHorizontal: 40,
  },
  signInButtonContainer: {
    padding: 5,
  },
});

export default style;
