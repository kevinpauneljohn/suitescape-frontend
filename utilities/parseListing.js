const parseListing = ({
  listing: {
    id,
    name,
    location,
    likes,
    saves,
    views,
    is_liked: isLikedDefault,
    is_saved: isSavedDefault,
    is_viewed: isViewedDefault,
    average_rating: avgRatingDefault,
    lowest_room_price: lowestRoomPrice,
    ...rest
  },
}) => ({
  id,
  name,
  location,
  likes,
  saves,
  views,
  isLiked: rest.isLiked ?? isLikedDefault,
  isSaved: rest.isSaved ?? isSavedDefault,
  isViewed: rest.isViewed ?? isViewedDefault,
  avgRating: rest.avgRating ?? avgRatingDefault,
  price: rest.price ?? Math.floor(lowestRoomPrice),
});

export default parseListing;
