import axious from 'axios';
import { API_URL } from './authstore'; // Adjust the import path as necessary

const instance = axious.create({
    baseURL: `${API_URL}/api`,
    withCredentials: true,
});

export default instance;
