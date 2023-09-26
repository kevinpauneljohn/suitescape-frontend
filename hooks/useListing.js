const useListing = ({listing}) => {
  const {
    name,
    location,
    likes,
    saves,
    views,
    is_liked: isLiked,
    is_saved: isSaved,
    is_viewed: isViewed,
    average_rating: avgRating,
    lowest_room_price: lowestRoomPrice,
  } = listing;

  const price = Math.floor(lowestRoomPrice);

  return {
    name,
    location,
    likes,
    saves,
    views,
    isLiked,
    isSaved,
    isViewed,
    avgRating,
    price,
  };
};

export default useListing;
