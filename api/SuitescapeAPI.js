import axios from 'axios';

const SuitescapeAPI = axios.create({
  baseURL: 'http://suitescape-api.test/api',
});

export default SuitescapeAPI;
