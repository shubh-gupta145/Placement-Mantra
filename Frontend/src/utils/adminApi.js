import axios from 'axios';

const adminApi = axios.create({
  baseURL: 'http://localhost:5000'
});

// Har request mein token automatically lagao
adminApi.interceptors.request.use(config => {
  const token = localStorage.getItem('pm_admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 401 aaye toh logout karo
adminApi.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('pm_admin_token');
      localStorage.removeItem('pm_admin_user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(err);
  }
);

export default adminApi;