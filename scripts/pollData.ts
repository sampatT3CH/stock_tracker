import cron from 'node-cron';
import axios from 'axios';

cron.schedule('*/5 * * * * *', async () => {
  try {
    await axios.get('http://localhost:3001/api/poll');
  } catch (error:any) {
    console.error('Error polling data:', error.message);
  }
});

console.log('Cron job started');
