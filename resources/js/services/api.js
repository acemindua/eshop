// services/apiService.js
import axios from "axios";

const apiService = axios.create({
    baseURL: "/api/v1",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true, // Important for handling sessions/cookies with Laravel Sanctum
});

// You can also add interceptors here for request/response handling,
// e.g., for error handling, adding auth tokens, etc.

// Request Interceptor (Example: if you were using an Authorization header)
// apiService.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken'); // Or wherever you store your token
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Response Interceptor (Example: for global error handling or refreshing tokens)
// apiService.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // Handle unauthorized errors, e.g., redirect to login
//       console.log('Unauthorized request, redirecting to login...');
//       // window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

export default {
    // A generic GET method for fetching resources
    get(url, config = {}) {
        return apiService.get(url, config);
    },

    // You might want to add other common HTTP methods as well
    post(url, data, config = {}) {
        console.log(
            `Making POST request to: ${apiService.defaults.baseURL}${url}`
        );
        return apiService.post(url, data, config);
    },

    put(url, data, config = {}) {
        console.log(
            `Making PUT request to: ${apiService.defaults.baseURL}${url}`
        );
        return apiService.put(url, data, config);
    },

    delete(url, config = {}) {
        console.log(
            `Making DELETE request to: ${apiService.defaults.baseURL}${url}`
        );
        return apiService.delete(url, config);
    },

    // Your original getAll method, slightly renamed for clarity if you only want it for "all"
    // Though 'get' is more standard
    // getAll(url) {
    //     console.log(`Making GET all request to: ${apiService.defaults.baseURL}${url}`);
    //     return apiService.get(url);
    // },
};
