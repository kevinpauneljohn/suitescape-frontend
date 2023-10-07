import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  flexFull: {
    flex: 1,
  },
  registrationButtonContainer: {
    marginTop: 12,
    marginHorizontal: 23,
  },
  emptyText: {
    marginTop: 3,
  },
});

export const pressedOpacity = (pressed, opacity = 0.5) =>
  pressed ? {opacity} : {};
export const disabledOpacity = (disabled, opacity = 0.6) =>
  disabled ? {opacity} : {};
export const pressedBgColor = (pressed, backgroundColor = 'lightgray') =>
  pressed ? {backgroundColor} : {};

export default globalStyles;
