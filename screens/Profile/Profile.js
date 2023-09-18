import React from 'react';
import {Button} from 'react-native-paper';
import SuitescapeAPI from '../../services/SuitescapeAPI';
import {useUser} from '../../storage/userStorage';
import {handleApiError, handleApiResponse} from '../../utilities/apiHelpers';
import {Alert} from 'react-native';
import {Routes} from '../../navigation/Routes';

const Profile = ({navigation}) => {
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
        onError: e => Alert.alert('Error', e.message),
        onSuccess: () => {
          setToken('');
          navigation.replace(Routes.LOGIN);
        },
      });
    } catch (err) {
      handleApiError(err, e => Alert.alert('Error', e.message));
    }
  };

  return <Button onPress={() => logout()}>Logout</Button>;
};

export default Profile;
