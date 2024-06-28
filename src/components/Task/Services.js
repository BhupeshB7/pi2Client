import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:5500/api',
  // baseURL: 'https://mlm-v99c.onrender.com/api',
  baseURL: 'https://piserver-pf9r.onrender.com/api',
});


export default api;
