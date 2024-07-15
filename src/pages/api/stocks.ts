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
  const { symbol } = req.query;

  try {
    await mongoose.connect('mongodb+srv://mpskumar075:ihPt0BS1HN8qJ67C@cluster0.led7apr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

    const data = await Stock.find({ symbol })
      .sort({ timestamp: -1 })
      .limit(20)
      .lean();

    res.status(200).json(data);
  } catch (error:any) {
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
};

export default handler;
