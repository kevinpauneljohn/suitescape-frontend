import {Alert} from 'react-native';
import {userStorage} from '../storage/userStorage';

export const handleApiResponse = ({response, onError, onSuccess}) => {
  const result = response.data;

  if (result.errors) {
    Alert.alert('Error', result.message);
    onError && onError(result);
    return;
  }

  if (result.token) {
    userStorage.setString('token', result.token);
  }

  if (result.message && !result.token) {
    Alert.alert('Success', result.message);
  }

  if (result.user) {
    console.log(result.user);
  }

  onSuccess && onSuccess(result);
  // console.log(result);
};

export const handleApiError = (err, handleErrors) => {
  const errorResponse = err.response;

  if (errorResponse) {
    const errors = errorResponse.data;
    handleErrors && handleErrors(errors);
    console.log(errors);
    return;
  }

  Alert.alert('Error', err.message);
  console.log(err.request);
};
