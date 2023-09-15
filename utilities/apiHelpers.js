import {Alert} from 'react-native';
import {userStorage} from '../storage/userStorage';

export const handleApiResponse = ({response, onError, onSuccess}) => {
  if (response.data.errors) {
    Alert.alert('Error', response.data.message);
    onError(response.data.errors);
    return;
  }
  Alert.alert('Success', response.data.message);
  if (response.data.token) {
    userStorage.setString('token', response.data.token);
  }
  if (response.data.user) {
    console.log(response.data.user);
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
