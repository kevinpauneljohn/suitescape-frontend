import {Alert} from 'react-native';
import {userStorage} from '../storage/userStorage';

export const handleApiResponse = ({response, onError, onSuccess}) => {
  if (response.data.errors) {
    Alert.alert('Error', response.data.message);
    onError && onError(response.data);
    return;
  }
  if (response.data.message) {
    Alert.alert('Success', response.data.message);
  }
  if (response.data.token) {
    userStorage.setString('token', response.data.token);
  }
  if (response.data.user) {
    console.log(response.data.user);
  }
  onSuccess && onSuccess(response.data);
  // console.log(response.data);
};

export const handleApiError = (err, handleErrors) => {
  if (err.response) {
    handleErrors && handleErrors(err.response.data);
    console.log(err.response.data);
  } else {
    Alert.alert('Error', err.message);
    console.log(err.request);
  }
};
