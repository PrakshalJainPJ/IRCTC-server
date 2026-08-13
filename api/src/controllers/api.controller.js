import fetch from 'node-fetch';

const trainLiveStatus = async (req, res) => {
    try {
        let fetchStatus = await fetch(`https://www.mauryajivlogger.in/api/railway/track?trainNo=${req.params.trainNo}&date=${req.params.startDay}`);
        const dataTrainStatus = await fetchStatus.json();
        res.send(dataTrainStatus);
    } catch (error) {
        console.error('Error fetching live status:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch live status.' });
    }
};
const searchStation = async (req, res) => {
    try {
        let fetchStatus = await fetch(`https://www.mauryajivlogger.in/api/railway/station-suggest?query=${req.params.station}`);
        const dataTrainStatus = await fetchStatus.json();
        res.send(dataTrainStatus);
    } catch (error) {
        console.error('Error fetching stations:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch stations.' });
    }
};
const searchTrains = async (req, res) => {
    try {
        let fetchStatus = await fetch(`https://www.mauryajivlogger.in/api/railway/search?from=${req.params.fromStation}&to=${req.params.toStation}&date=${req.params.date}`);
        const dataTrainStatus = await fetchStatus.json();
        res.send(dataTrainStatus);
    } catch (error) {
        console.error('Error fetching trains:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch trains.' });
    }
};
const checkFare = async (req, res) => {
    try {
        let fetchStatus = await fetch(`https://www.mauryajivlogger.in/api/railway/fare?trainNo=${req.params.trainNo}&from=${req.params.fromStation}&to=${req.params.toStation}&date=${req.params.date}&coach=${req.params.coach}&quota=${req.params.quota}`);
        const dataTrainStatus = await fetchStatus.json();
        res.send(dataTrainStatus);
    } catch (error) {
        console.error('Error fetching fare:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch fare data.' });
    }
};
const seatAvailability = async (req, res) => {
    try {
        let fetchStatus = await fetch(`https://www.mauryajivlogger.in/api/railway/availability?trainNo=${req.params.trainNo}&from=${req.params.fromStation}&to=${req.params.toStation}&date=${req.params.date}&coach=${req.params.coach}&quota=${req.params.quota}`);
        const dataTrainStatus = await fetchStatus.json();
        res.send(dataTrainStatus);
    } catch (error) {
        console.error('Error fetching seat availability:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch seat availability data.' });
    }
};
const trainSchedule = async (req, res) => {
    try {
        let fetchStatus = await fetch(`https://www.mauryajivlogger.in/api/railway/train-info?trainNo=${req.params.trainNo}`);
        const dataTrainStatus = await fetchStatus.json();
        res.send(dataTrainStatus);
    } catch (error) {
        console.error('Error fetching train schedule:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch train schedule.' });
    }
};

export {
    trainLiveStatus,
    searchStation,
    searchTrains,
    checkFare,
    seatAvailability,
    trainSchedule
};