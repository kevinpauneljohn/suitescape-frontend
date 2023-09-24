import React from 'react';
import {Button} from 'react-native-paper';
import SuitescapeAPI from '../../services/SuitescapeAPI';
import {useUser} from '../../storage/userStorage';
import {handleApiError, handleApiResponse} from '../../utilities/apiHelpers';
import {Routes} from '../../navigation/Routes';
import {settingsStorage} from '../../storage/settingsStorage';

const Profile = ({navigation}) => {
  const [token, setToken] = useUser('token', '');

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
        onError: () => {
          handleLogout();
        },
        onSuccess: () => {
          handleLogout();
        },
      });
    } catch (err) {
      handleApiError(err, e => {
        handleLogout();
      });
    }
  };

  return <Button onPress={() => logout()}>Logout</Button>;
};

export default Profile;
