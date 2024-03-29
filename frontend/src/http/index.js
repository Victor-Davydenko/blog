import axios from 'axios';

const api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BASE_URI,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  return config;
});

api.interceptors.response.use((config) => {
  return config;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && error.config && !error.config.isRetry) {
    originalRequest.isRetry = true;
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URI}/refresh`, { withCredentials: true });
      localStorage.setItem('accessToken', response.data.accessToken);
      return api.request(originalRequest);
    }
    catch (e) {
      throw new Error(e);
    }
  }
  return error;
});

export default api;