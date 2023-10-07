const parseHost = ({
  id,
  firstname,
  middlename,
  lastname,
  email,
  listings_count: listingsCount,
  date_of_birth: dateOfBirth,
  mobile_number: mobileNumber,
  created_at: createdAt,
  updated_at: updatedAt,
  email_verified_at: emailVerifiedAt,
}) => ({
  id,
  firstname,
  middlename,
  lastname,
  email,
  listingsCount,
  dateOfBirth,
  mobileNumber,
  createdAt,
  updatedAt,
  emailVerifiedAt,
});

export default parseHost;
