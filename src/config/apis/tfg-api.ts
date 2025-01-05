import axios from 'axios';

export const apiEndpoint = axios.create({
    baseURL: 'https://localhost:3000/api/v1',
});