import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  registrationButtonContainer: {
    marginTop: 12,
  },
});

export const pressedOpacity = (pressed, opacity = 0.5) =>
  pressed ? {opacity} : {};
export const disabledOpacity = (disabled, opacity = 0.6) =>
  disabled ? {opacity} : {};

export default globalStyles;
