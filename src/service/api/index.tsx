import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1';

let sessionToken:string|null; 

if (typeof window !== 'undefined') {
    sessionToken= localStorage.getItem('sessionToken');
}


const handleResponse = (response: AxiosResponse) => {
    if (response.status < 200 || response.status >= 300) {
        throw new Error(response.data.message || 'Something went wrong');
    }

    return response.data.data;
};

const get = async (endpoint: string) => {
    try {
        const response = await axios.get(`${BASE_URL}${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${sessionToken}`
            }
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error during GET request:', error);
        throw error;
    }
};

const post = async (endpoint: string, data: any) => {
    try {
        const headers = !(endpoint.endsWith('login') || endpoint.endsWith('signup')) ? 
        { 'Content-Type': 'application/json', Authorization: `Bearer ${sessionToken}` } :
        { 'Content-Type': 'application/json' };
        const response = await axios.post(`${BASE_URL}${endpoint}`, data, {headers});
        return handleResponse(response);
    } catch (error) {
        console.error('Error during POST request:', error);
        throw error;
    }
};

const patch = async (endpoint: string, data: any) => {
    try {
        const response = await axios.patch(`${BASE_URL}${endpoint}`, data, {
            headers: {
                'Authorization': `Bearer ${sessionToken}`
            },
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error during PATCH request:', error);
        throw error;
    }
};

const del = async (endpoint: string,) => {
    try {
        const response = await axios.delete(`${BASE_URL}${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${sessionToken}`
            },
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error during DELETE request:', error);
        throw error;
    }
};

export { get, post, patch, del };

