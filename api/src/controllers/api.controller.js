// Use native fetch instead of node-fetch

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

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

        let fetchStatus = await fetch(`https://railways.makemytrip.com/api/tbsWithAvailabilityAndRecommendation/${fromStation}/${toStation}/${formattedDate}?supportLadiesQuota=true`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'en-US,en;q=0.9',
                'Origin': 'https://www.makemytrip.com',
                'Referer': 'https://www.makemytrip.com/'
            },
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        const dataTrainStatus = await fetchStatus.json();
        
        // Combine both lists from the MMT response
        const allTrains = [
            ...(dataTrainStatus.trainBtwnStnsList || []),
            ...(dataTrainStatus.otherDayTrainsList || [])
        ];

        // Clean up: filter out tbsAvailability entries where data is null
        const cleanedTrains = allTrains.map(train => {
            if (train.tbsAvailability) {
                train.tbsAvailability = train.tbsAvailability.filter(
                    entry => entry.availablityDate && entry.availablityStatus
                );
            }
            return train;
        });

        res.send({ success: true, data: cleanedTrains });
    } catch (error) {
        console.error('Error fetching trains:', error);
        res.status(500).json({ success: false, message: `Failed to fetch trains. Details: ${error.message}` });
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
const trainAvailability = async (req, res) => {
    try {
        const { trainNo, fromStation, toStation, date, coach, quota } = req.params;
        // Convert DD-MM-YYYY to YYYYMMDD
        const [day, month, year] = date.split('-');
        const formattedDate = `${year}${month}${day}`;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const payload = {
            class: coach,
            destination: toStation,
            doj: formattedDate,
            moreThanOneDay: false,
            quota: quota,
            source: fromStation,
            trainNumber: trainNo
        };

        let fetchStatus = await fetch('https://railways.makemytrip.com/api/mobile/enquiry/availability', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'en-US,en;q=0.9',
                'Origin': 'https://www.makemytrip.com',
                'Referer': 'https://www.makemytrip.com/'
            },
            body: JSON.stringify(payload),
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        const data = await fetchStatus.json();
        res.send({ success: true, data });
    } catch (error) {
        console.error('Error fetching availability:', error);
        res.status(500).json({ success: false, message: `Failed to fetch availability. Details: ${error.message}` });
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
    trainAvailability,
    trainSchedule
};