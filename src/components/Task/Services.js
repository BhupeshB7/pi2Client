import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:5000/api',
  baseURL: 'https://mlm-gc1b.onrender.com/api',
});


export default api;
