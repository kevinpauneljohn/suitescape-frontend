import React from 'react';
import {Button} from 'react-native-paper';
import SuitescapeAPI from '../../services/SuitescapeAPI';
import {useUser} from '../../storage/userStorage';
import {handleApiError, handleApiResponse} from '../../utilities/apiHelpers';
import {Routes} from '../../navigation/Routes';
import {settingsStorage} from '../../storage/settingsStorage';
import {Alert} from 'react-native';

const Profile = ({navigation}) => {
  const [token, setToken] = useUser('token', '');

  const promptLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Confirm',
        onPress: () => logout(),
        style: 'destructive',
      },
    ]);
  };

  const handleLogout = () => {
    setToken('');
    settingsStorage.setBool('skipOnboarding', false);
    navigation.replace(Routes.ONBOARDING);
  };

  const logout = async () => {
    try {
      const response = await SuitescapeAPI.post(
        '/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      handleApiResponse({
        response,
        onError: err => {
          Alert.alert('Error', err.message);
          console.log(err);
          handleLogout();
        },
        onSuccess: () => {
          Alert.alert('Logout successful', 'You are now logged out.');
          handleLogout();
        },
      });
    } catch (err) {
      handleApiError({
        error: err,
        defaultAlert: true,
        handleErrors: () => handleLogout(),
      });
    }
  };

  return <Button onPress={() => promptLogout()}>Logout</Button>;
};

export default Profile;
