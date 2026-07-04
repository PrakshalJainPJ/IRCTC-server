import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import cookieParser from 'cookie-parser';

const app = express();

const whitelist = ['https://myrailmate.vercel.app/search-train', 'https://myrailmate.vercel.app/train-schedule', 'https://myrailmate.vercel.app/train-status'];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(cookieParser());

import apiRoutes from './src/routes/apiRoutes.js';
app.use('/api', apiRoutes);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
export default app;