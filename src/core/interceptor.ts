import axios, { type AxiosResponse, type InternalAxiosRequestConfig, AxiosError } from 'axios';

// Create Axios instance
const api = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1/', // Replace with your API base URL
  timeout: 10000,
});

// Request Interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - e.g., redirect to login
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
