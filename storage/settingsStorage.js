import {create, MMKVLoader} from 'react-native-mmkv-storage';

export const settingsStorage = new MMKVLoader().initialize();

export const useSettings = create(settingsStorage);
