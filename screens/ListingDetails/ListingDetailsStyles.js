import {StyleSheet} from 'react-native';
import {Colors} from '../../assets/Colors';

const style = StyleSheet.create({
  plainContainer: {
    backgroundColor: 'white',
    marginBottom: 12,
  },
  container: {
    backgroundColor: 'white',
    paddingTop: 15,
    paddingBottom: 20,
    paddingHorizontal: 15,
    marginBottom: 12,
  },
  text: {
    color: 'black',
    fontSize: 15,
  },
  ratingsText: {
    fontSize: 15,
  },
  hostNameText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  joinedDateText: {
    fontSize: 10,
  },
  responseText: {
    fontSize: 12,
    paddingBottom: 3,
  },
  seeAllText: {
    textTransform: 'uppercase',
    fontSize: 14,
  },
  reportText: {
    color: 'red',
  },
  headerText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  largeHeaderText: {
    color: 'black',
    paddingVertical: 3,
    fontSize: 25,
    fontWeight: 'bold',
  },
  titleContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  ratingsContainer: {
    flexDirection: 'row',
    paddingTop: 5,
  },
  reviewsContainer: {
    paddingLeft: 20,
  },
  hostContentContainer: {
    padding: 15,
    flexDirection: 'row',
  },
  hostDetailsContainer: {
    flex: 1,
    paddingLeft: 15,
  },
  responseContainer: {
    paddingTop: 12,
  },
  locationContainer: {
    backgroundColor: Colors.lightgray,
    height: 200,
    borderRadius: 10,
    paddingVertical: 10,
  },
  reviewsHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amenitiesSeeAllContainer: {
    alignItems: 'center',
  },
  reviewsSeeAllContainer: {
    marginBottom: 14,
  },
  reportContainer: {
    marginBottom: 0,
  },
});

export default style;
