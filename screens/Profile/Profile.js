import React from 'react';
import {Button} from 'react-native-paper';
import SuitescapeAPI from '../../services/SuitescapeAPI';
import {useUser} from '../../storage/userStorage';
import {handleApiError, handleApiResponse} from '../../utilities/apiHelpers';
import {Alert} from 'react-native';
import {Routes} from '../../navigation/Routes';
import {useSettings} from '../../storage/settingsStorage';

const Profile = ({navigation}) => {
  const [_skipOnboarding, setSkipOnboarding] = useSettings(
    'skipOnboarding',
    false,
  );
  const [token, setToken] = useUser('token', '');

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
        onSuccess: () => {
          setToken('');
          setSkipOnboarding(false);
          navigation.replace(Routes.ONBOARDING);
        },
      });
    } catch (err) {
      handleApiError(err, e => {
        Alert.alert('Error', e.message);
        navigation.replace(Routes.ONBOARDING);
      });
    }
  };

  return <Button onPress={() => logout()}>Logout</Button>;
};

export default Profile;
