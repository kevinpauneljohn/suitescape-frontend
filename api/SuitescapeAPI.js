import axios from 'axios';

const SuitescapeAPI = axios.create({
  baseURL: 'http://192.168.100.151/suitescape-api.test/api',
});

export default SuitescapeAPI;
