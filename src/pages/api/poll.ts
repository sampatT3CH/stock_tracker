import axios from 'axios';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

const StockSchema = new mongoose.Schema({
  symbol: String,
  open: Number,
  high: Number,
  low: Number,
  close: Number,
  volume: Number,
  timestamp: Date,
});

const Stock = mongoose.models.Stock || mongoose.model('Stock', StockSchema);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  const symbols = ['GOOG', 'IBM', 'BTC', 'ETH', 'AAPL'];

  try {
    await mongoose.connect('mongodb+srv://mpskumar075:ihPt0BS1HN8qJ67C@cluster0.led7apr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

    for (const symbol of symbols) {
      const response = await axios.get(`https://www.alphavantage.co/query`, {
        params: {
          function: 'TIME_SERIES_INTRADAY',
          symbol,
          interval: '5min',
          apikey: "HFDCWODDWE1OMMWK",
        },
      });

      const timeSeries = response.data['Time Series (5min)'];
      for (const timestamp in timeSeries) {
        const data = timeSeries[timestamp];
        await Stock.create({
          symbol,
          open: parseFloat(data['1. open']),
          high: parseFloat(data['2. high']),
          low: parseFloat(data['3. low']),
          close: parseFloat(data['4. close']),
          volume: parseInt(data['5. volume'], 10),
          timestamp: new Date(timestamp),
        });
      }
    }

    res.status(200).json({ message: 'Data fetched and stored successfully' });
  } catch (error:any) {
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
};

export default handler;
