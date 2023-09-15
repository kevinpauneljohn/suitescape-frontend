import {Appearance, StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  registrationButtonContainer: {
    marginTop: 12,
  },
  themeColor: Appearance.getColorScheme() === 'dark' ? 'white' : 'black',
});

export default globalStyles;
