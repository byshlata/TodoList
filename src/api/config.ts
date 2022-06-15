import axios from 'axios';

export const API_CONFIG = axios.create({
  baseURL:
    process.env.REACT_APP_BASE_URL || 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: { 'API-KEY': `${process.env.REACT_APP_API_KEY}` } || {
    'API-KEY': `0967d036-cdf5-45ba-9506-15a0d81dbb85`,
  },
});
