// import express from 'express';
// import cors from 'cors';
// import fetch from 'node-fetch';
const express = require('express')
const cors = require('cors')
const nodemon = require('nodemon')
const app = express();
app.use(cors());
app.get('/api/train-status/:trainNo', async (req, res) => {
    let url = `https://www.railyatri.in/live-train-status/${req.params.trainNo}`;
    let fetchState = await fetch(url);
    const data = await fetchState.text();
    res.send(data);
});
module.exports = app;