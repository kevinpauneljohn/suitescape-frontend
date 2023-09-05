import {Platform, StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 30,
    paddingBottom: 10,
  },
  logoText: {
    fontFamily: 'Poppins',
    color: 'black',
    letterSpacing: 0.15,
    fontSize: 40,
    textTransform: 'uppercase',
  },
  boldText: {
    fontFamily: 'Poppins-Bold',
  },
  fixText: {
    paddingTop: Platform.OS === 'android' ? 3 : 0,
  },
});

export default style;
