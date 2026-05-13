import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ezme_admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const productService = {
  getAll: () => api.get('/api/products'),
  getById: (id) => api.get(`/api/products/${id}`),
};

export const orderService = {
  create: (order) => api.post('/api/orders', order),
};

export const adminService = {
  login: (credentials) => api.post('/api/admin/login', credentials),
  getProducts: () => api.get('/api/admin/products'),
  createProduct: (data) => api.post('/api/admin/products', data),
  updateProduct: (id, data) => api.put(`/api/admin/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/api/admin/products/${id}`),
  getOrders: () => api.get('/api/admin/orders'),
  updateOrder: (id, data) => api.put(`/api/admin/orders/${id}`, data),
  getDashboard: () => api.get('/api/admin/dashboard'),
};

export default api;
