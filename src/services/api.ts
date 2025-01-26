import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to include the Bearer token
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token'); // Get the token from localStorage (or any other storage you're using)
//   if (token) {
//     config.headers.Authorization = `Token ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

//
// // Automatically add CSRF token to requests
// API.interceptors.request.use((config) => {
//   const csrfToken = getCookie('csrftoken'); // Retrieve the CSRF token from cookies
//   if (csrfToken) {
//     config.headers['X-CSRFToken'] = csrfToken;
//   }
//   return config;
// });
//
// function getCookie(name: string | unknown[]) {
//   let cookieValue = null;
//   if (document.cookie && document.cookie !== '') {
//     const cookies = document.cookie.split(';');
//     for (let i = 0; i < cookies.length; i++) {
//       const cookie = cookies[i].trim();
//       // Does this cookie string begin with the name we want?
//       if (cookie.substring(0, name.length + 1) === `${name}=`) {
//         cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//         break;
//       }
//     }
//   }
//   return cookieValue;
// }

export default API;
