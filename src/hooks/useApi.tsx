'use client'

import { useState, useEffect } from 'react';
import { get } from '@/service/api/index';


const useApi = (endpoint: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await get(endpoint);
        setData(result);
      } catch (error: any) {
        console.error('API request error:', error);
        setError(error.message || 'Failed to fetch data');
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error }
};

export default useApi;
