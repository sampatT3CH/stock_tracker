import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../store';
import axios from 'axios';
import { setData, setSelectedSymbol } from '../store';

const StockTable: React.FC = () => {
  const dispatch = useDispatch();
  const data = useAppSelector((state) => state.stocks.data);
  const selectedSymbol = useAppSelector((state) => state.stocks.selectedSymbol);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      try {
        const response = await axios.get(`/api/stocks?symbol=${selectedSymbol}`);
        dispatch(setData(response.data));
      } catch (error:any) {
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false); 
      }
    };

    const interval = setInterval(fetchData, 5000); 
    fetchData(); 

    return () => clearInterval(interval);
  }, [selectedSymbol, dispatch]);

  const changeSymbol = (newSymbol: string) => {
    dispatch(setSelectedSymbol(newSymbol));
    setModalOpen(false);
  };

  return (
    <div className="stock-table-container">
      <h1>{selectedSymbol} Stock Data</h1>
      {loading ? (
        <div className="loader">Loading...</div> 
      ) : (
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Open</th>
              <th>High</th>
              <th>Low</th>
              <th>Close</th>
              <th>Volume</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry: any) => (
              <tr key={entry.timestamp}>
                <td>{new Date(entry.timestamp).toLocaleString()}</td>
                <td>{entry.open}</td>
                <td>{entry.high}</td>
                <td>{entry.low}</td>
                <td>{entry.close}</td>
                <td>{entry.volume}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={() => setModalOpen(true)}>Change Stock/Crypto</button>
      {modalOpen && (
        <div className="modal">
          <h2>Select Stock/Crypto</h2>
          {['GOOG', 'IBM', 'BTC', 'ETH', 'AAPL'].map((symbol) => (
            <button key={symbol} onClick={() => changeSymbol(symbol)}>
              {symbol}
            </button>
          ))}
          <button onClick={() => setModalOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default StockTable;
