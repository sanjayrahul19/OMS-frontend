import axios from 'axios';

let session_token;

if (typeof window !== 'undefined') {
session_token = localStorage.getItem("session_token")
}

const headers: {
    'Content-Type': string;
    [key: string]: string; // Allow any string key with string
  } = {
    'Content-Type': 'application/json',
  };

if (session_token) {
    headers['Authorization'] = `bearer ${session_token}`;
}

const apiService = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    headers: headers,
    timeout: 5000,
});

export default apiService
