import fetch from 'node-fetch';

const trainLiveStatus = async (req, res) => {
    let fetchStatus = await fetch(`https://www.mauryajivlogger.in/api/railway/track?trainNo=${req.params.trainNo}&date=${req.params.startDay}`);
    const dataTrainStatus = await fetchStatus.json();
    res.send(dataTrainStatus);
};
const searchStation = async (req, res) => {
    let fetchStatus = await fetch(`https://www.mauryajivlogger.in/api/railway/station-suggest?query=${req.params.station}`);
    const dataTrainStatus = await fetchStatus.json();
    res.send(dataTrainStatus);
};
const searchTrains = async (req, res) => {
    let fetchStatus = await fetch(`https://www.mauryajivlogger.in/api/railway/search?from=${req.params.fromStation}&to=${req.params.toStation}&date=${req.params.date}`);
    const dataTrainStatus = await fetchStatus.json();
    res.send(dataTrainStatus);
};
const checkFare = async (req, res) => {
    let fetchStatus = await fetch(`https://www.mauryajivlogger.in/api/railway/fare?trainNo=${req.params.trainNo}&from=${req.params.fromStation}&to=${req.params.toStation}&date=${req.params.date}&coach=${req.params.coach}&quota=${req.params.quota}`);
    const dataTrainStatus = await fetchStatus.json();
    res.send(dataTrainStatus);
};
const seatAvailability = async (req, res) => {
    let fetchStatus = await fetch(`https://www.mauryajivlogger.in/api/railway/availability?trainNo=${req.params.trainNo}&from=${req.params.fromStation}&to=${req.params.toStation}&date=${req.params.date}&coach=${req.params.coach}&quota=${req.params.quota}`);
    const dataTrainStatus = await fetchStatus.json();
    res.send(dataTrainStatus);
};
const trainSchedule = async (req, res) => {
    let fetchStatus = await fetch(`https://www.mauryajivlogger.in/api/railway/train-info?trainNo=${req.params.trainNo}`);
    const dataTrainStatus = await fetchStatus.json();
    res.send(dataTrainStatus);
};

export {
    trainLiveStatus,
    searchStation,
    searchTrains,
    checkFare,
    seatAvailability,
    trainSchedule
};