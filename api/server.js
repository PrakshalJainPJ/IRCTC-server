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
app.get('/api/train-name-number/:train', async (req, res) => {
    let trainNameNumberUrl = `https://search.railyatri.in/mobile/trainsearch?q=${req.params.train}&slip_type=1`;
    let fetchTrainNameNumber = await fetch(trainNameNumberUrl);
    const TrainNameNumberData = await fetchTrainNameNumber.json();
    res.send(TrainNameNumberData);
});
app.get('/api/check-pnr-status/:pnr', async (req, res) => {
    let pnrStatusCheckUrl = `https://www.railyatri.in/_next/data/6433c23262ce72096a45d1631h4g92c2/m/pnr-status/${req.params.pnr}.json`;
    let fetchPnrStatus = await fetch(pnrStatusCheckUrl);
    const PnrStatusData = await fetchPnrStatus.json();
    res.send(PnrStatusData);
});
export default app;