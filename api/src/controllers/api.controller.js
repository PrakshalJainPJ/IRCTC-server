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
        const { fromStation, toStation, date } = req.params;
        // Convert DD-MM-YYYY to YYYYMMDD
        const [day, month, year] = date.split('-');
        const formattedDate = `${year}${month}${day}`;

        let fetchStatus = await fetch(`https://railways.makemytrip.com/api/tbsWithAvailabilityAndRecommendation/${fromStation}/${toStation}/${formattedDate}?supportLadiesQuota=true`);
        const dataTrainStatus = await fetchStatus.json();
        
        // Ensure we send back the array of trains
        if (dataTrainStatus && dataTrainStatus.otherDayTrainsList) {
            res.send({ success: true, data: dataTrainStatus.otherDayTrainsList });
        } else {
            res.send({ success: true, data: [] });
        }
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