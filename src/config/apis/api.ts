import axios from 'axios';
import { StorageAdapter } from "../adapters/storage-adapter";


const api = axios.create({
    baseURL: 'http://10.0.2.2:3000/api/v1',
    headers: {
        'Content-Type': 'application/json'
    }
});

//TODO interceptors
api.interceptors.request.use(
    async (config) => {

        const user = await StorageAdapter.getItem('user');
        if (user && user.token) {
            config.headers['Authorization'] = `Bearer ${user.token}`;
        }

        return config;
    });

export {
    api
}