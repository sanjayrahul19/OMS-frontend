// useApiHook.js

import { useState, useEffect } from 'react';
import { AxiosResponse, AxiosError } from 'axios';
import apiService from '@/app/service/apiService';

interface ApiHookParams {
  endpoint: string;
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH'; // Support for GET, POST, DELETE, and PATCH
  data?: any; // Data to be sent in the request (for POST and PATCH)
}

const useApiHook = (apiParams: ApiHookParams) => {

  const [responseData, setResponseData] = useState<null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        let response: AxiosResponse;

        switch (apiParams.method) {
          case 'GET':
            response = await apiService.get(apiParams.endpoint);
            break;
          case 'POST':
            response = await apiService.post(apiParams.endpoint, apiParams.data);
            break;
          case 'DELETE':
            response = await apiService.delete(apiParams.endpoint);
            break;
          case 'PATCH':
            response = await apiService.patch(apiParams.endpoint, apiParams.data);
            break;
          default:
            throw new Error(`Unsupported HTTP method: ${apiParams.method}`);
        }

        setResponseData(response.data.data);
      } catch (error) {
       
        const errorObject = error as AxiosError<{ message?: string }>
        setError(errorObject?.response?.data?.message||"An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (apiParams.data !== null) {
        fetchData();
      }
  }, [apiParams.data]);

  return { responseData, loading, error };
};

export default useApiHook;
