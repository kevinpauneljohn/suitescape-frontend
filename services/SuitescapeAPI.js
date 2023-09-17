import axios from 'axios';

export const baseURL = 'http://192.168.100.151/suitescape-api.test/api';

const SuitescapeAPI = axios.create({
  baseURL,
});

export default SuitescapeAPI;
