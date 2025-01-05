import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.get('/api/train-status/:trainNo/:startDay', async (req, res) => {
    let TrainStatusUrl = `https://livestatus.railyatri.in/api/v3/train_eta_data/${req.params.trainNo}/-1.json?start_day=${req.params.startDay}`;
    let fetchStatus = await fetch(TrainStatusUrl);
    const dataTrainStatus = await fetchStatus.json();
    res.send(dataTrainStatus);
});
app.get('/api/train-name-number', async (req, res) => {
    let trainNameNumberUrl = 'https://enquiry.indianrail.gov.in/mntes/javascripts/train_data.js?v=2';
    let fetchTrainNameNumber = await fetch(trainNameNumberUrl);
    const TrainNameNumberData = await fetchTrainNameNumber.text();
    res.send(TrainNameNumberData);
});
export default app;