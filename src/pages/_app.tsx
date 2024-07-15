import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../store';
import React, { useEffect } from 'react';
import StockTable from '@/components/StockTable';
import axios from 'axios';


function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/poll');
      } catch (error:any) {
        console.error('Error polling data:', error.message);
      }
    };

    const intervalId = setInterval(fetchData, 5000); 

    return () => clearInterval(intervalId);
  }, []);
  return (
    <Provider store={store}>
      <StockTable />
    </Provider>
  );
}

export default MyApp;
