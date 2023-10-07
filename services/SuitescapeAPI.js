import axios from 'axios';

// Replace this with your local/private IP Address
// const serverIpAddress = '192.168.1.142';
const serverIpAddress = '192.168.100.151';

export const baseURL = `http://${serverIpAddress}/suitescape-api.test/api`;

const SuitescapeAPI = axios.create({
  baseURL,
});

export default SuitescapeAPI;
