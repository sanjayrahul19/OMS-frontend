import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

const BASE_URL = 'your_base_url_here'; // Replace with your base URL
const sessionToken = 'your_session_token_here'; // Replace with your session token

const apiService = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

const handleResponse = (response: AxiosResponse) => {
    if (response.status < 200 || response.status >= 300) {
        throw new Error(response.data.message || 'Something went wrong');
    }
    return response.data.data;
};

const sendRequest = async (method: string, endpoint: string, data: any, includeAuthHeader: boolean = false) => {
    try {
        const config: AxiosRequestConfig = {
            method,
            url: endpoint,
            data,
        };

        if (includeAuthHeader) {
            config.headers = {
                'Authorization': `Bearer ${sessionToken}`
            };
        }

        const response = await apiService.request(config);
        return handleResponse(response);
    } catch (error) {
        console.error(`Error during ${method.toUpperCase()} request:`, error);
        throw error;
    }
};

export const post = async (endpoint: string, data: any, includeAuthHeader: boolean = false) => {
    return sendRequest('post', endpoint, data, includeAuthHeader);
};

export const patch = async (endpoint: string, data: any, includeAuthHeader: boolean = false) => {
    return sendRequest('patch', endpoint, data, includeAuthHeader);
};

export const del = async (endpoint: string, includeAuthHeader: boolean = false) => {
    return sendRequest('delete', endpoint, null, includeAuthHeader);
};


//HOW TO USE:

// await del('/example', true)