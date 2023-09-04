import {Platform, StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 40,
    paddingBottom: 10,
  },
  logoText: {
    fontFamily: 'Poppins',
    letterSpacing: 0.15,
    fontSize: 40,
    textTransform: 'uppercase',
  },
  boldText: {
    fontFamily: 'Poppins-Bold',
  },
  fixText: {
    paddingTop: Platform.OS === 'android' ? 5 : 0,
  },
});

export default style;
