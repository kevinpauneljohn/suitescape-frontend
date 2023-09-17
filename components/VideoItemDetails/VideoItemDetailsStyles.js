import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 15,
    bottom: 30,
  },
  text: {
    fontFamily: 'Roboto',
    color: 'white',
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  locationText: {
    fontSize: 10,
  },
  priceText: {
    fontSize: 14,
  },
  ratingText: {
    fontSize: 12,
    marginLeft: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starRatingContainer: {
    marginBottom: 5,
  },
  starRating: {
    marginHorizontal: 1,
  },
});

export default style;
