import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors());
app.use(cookieParser());

import apiRoutes from './src/routes/apiRoutes.js';
app.use('/api', apiRoutes);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
export default app;