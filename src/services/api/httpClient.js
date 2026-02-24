import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 15000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

