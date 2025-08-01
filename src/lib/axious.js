import axious from 'axios';

const instance = axious.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
});

export default instance;
