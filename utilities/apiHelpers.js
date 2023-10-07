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

  if (result.user) {
    console.log(result.user);
  }

  onSuccess && onSuccess(result);
  // console.log(result);
};

export const handleApiError = ({error, handleErrors, defaultAlert = false}) => {
  const errorResponse = error.response;

  if (!errorResponse) {
    Alert.alert('Error', error.message);
    console.log(error.request);
    return;
  }

  const responseErrors = errorResponse.data;

  if (defaultAlert) {
    Alert.alert('Error', responseErrors.message);
  }

  handleErrors && handleErrors(responseErrors);
  console.log(responseErrors);
};
