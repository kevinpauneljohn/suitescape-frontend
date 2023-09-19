import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 15,
    bottom: 30,
    maxWidth: 200,
  },
  text: {
    fontFamily: 'Roboto',
    color: 'white',
    marginBottom: 5,
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  ratingText: {
    fontSize: 12,
    marginLeft: 5,
  },
  locationText: {
    fontSize: 10,
  },
  priceText: {
    fontSize: 16,
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
