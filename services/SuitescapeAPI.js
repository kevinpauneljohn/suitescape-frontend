import axios from 'axios';

const serverIpAddress = '192.168.100.151';

export const baseURL = `http://${serverIpAddress}/suitescape-api.test/api`;

const SuitescapeAPI = axios.create({
  baseURL,
});

export default SuitescapeAPI;
