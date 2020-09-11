import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import useFetchData from '@/utils/hooks/useFetchData';
import { API_EXAMPLE } from '@/constants/APIs';

function App() {
  const { value, fetchData } = useFetchData(API_EXAMPLE);
  useEffect(() => void fetchData(), [fetchData]);
  return <div>Hello World!</div>;
}

export default hot(App);
