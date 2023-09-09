import {create, MMKVLoader} from 'react-native-mmkv-storage';

export const userStorage = new MMKVLoader().initialize();

export const useUser = create(userStorage);
