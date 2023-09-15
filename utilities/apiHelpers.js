import {Alert} from 'react-native';
import {userStorage} from '../storage/userStorage';

export const handleApiResponse = (response, setErrors, onSuccess) => {
  if (response.data.errors) {
    Alert.alert('Error', response.data.message);
    setErrors(response.data.errors);
    return;
  }
  Alert.alert('Success', response.data.message);
  if (response.data.token) {
    userStorage.setString('token', response.data.token);
  }
  onSuccess && onSuccess();
};

export const handleApiError = (err, setErrors) => {
  if (err.response) {
    setErrors(err.response.data.errors);
    console.log(err.response.data);
  } else {
    Alert.alert('Error', err.message);
    console.log(err.request);
  }
};
