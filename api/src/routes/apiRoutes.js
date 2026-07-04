import express from 'express';
const router = express.Router();
import fetch from 'node-fetch';
import {trainLiveStatus, searchStation, searchTrains, checkFare, seatAvailability, trainSchedule } from '../controllers/api.controller.js';

router.get('/train-live-status/:trainNo/:startDay', trainLiveStatus);
router.get('/search-station/:station', searchStation);
router.get('/search-trains/:fromStation/:toStation/:date', searchTrains);
router.get('/fare-check/:trainNo/:fromStation/:toStation/:date/:coach/:quota', checkFare);
router.get('/seat-availability/:trainNo/:fromStation/:toStation/:date/:coach/:quota', seatAvailability);
router.get('/train-schedule/:trainNo', trainSchedule);

export default router;
