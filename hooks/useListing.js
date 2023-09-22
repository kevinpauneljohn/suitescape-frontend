const useListing = ({listing}) => {
  const {
    name,
    average_rating: avgRating,
    location,
    likes,
    room_categories,
  } = listing;

  const price = room_categories.length
    ? Math.floor(room_categories[0].price)
    : 0;

  return {name, avgRating, location, price, likes};
};

export default useListing;
