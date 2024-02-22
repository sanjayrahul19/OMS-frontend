'use client'

import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import useLocalStorage from './useLocalStorage';

interface Employee {
  _id: string;
  name: string;
  email: string;
  password: string;
  status: number;
  created_at: string;
}

interface ApiResponse {
  status_code: number;
  status: boolean;
  message: string;
  data: Employee[];
}


const useFetchData = (endpoint: string) => {
  const [data, setData] = useState<ApiResponse|null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


const BASE_URL = 'http://localhost:8000/api/v1'; // Replace with your base URL

  const [sessionToken] = useLocalStorage('sessionToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(!sessionToken)return
        const response: AxiosResponse<any> = await axios.get(`${BASE_URL}${endpoint}`, {
          headers: {
            'Authorization': `Bearer ${sessionToken}`
          }
        });
        setData(response.data);
      } catch (error: any) {
        console.error('Error during GET request:', error);
        setError(error.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

export default useFetchData;



//HOW TO USE:

// const endpoint = '/example';

// const { data, loading, error } = useFetchData(endpoint);

// {loading && <div>Loading...</div>}

// {error && <div>Error: {error}</div>}
      