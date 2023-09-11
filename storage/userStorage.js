import {create, MMKVLoader} from 'react-native-mmkv-storage';

export const userStorage = new MMKVLoader()
  .withInstanceID('userData')
  .initialize();

export const useUser = create(userStorage);
