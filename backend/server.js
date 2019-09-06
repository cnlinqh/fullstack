import mongoose from 'mongoose';
import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv'
import Data from './data';

// const mongoose = require('mongoose');
// const express = require('express');
// var cors = require('cors');
// const bodyParser = require('body-parser');
// const logger = require('morgan');
// const dotenv = require('dotenv');
// const Data = require('./data');
dotenv.config();
var MONGO_URL = `${process.env.MONGO_URL}`;
console.log(MONGO_URL);
const app = express();

app.use(cors());

const router = express.Router();


/*var db = mongoose.connection;
db.on('connecting', () => console.log('connecting to MongoDB...'));
db.on('error', () => {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
});
db.on('connected', () => console.log('MongoDB connected!'));
db.once('open', () => console.log('MongoDB connection opened!'));
db.on('reconnected', () => console.log('MongoDB reconnected!'));
db.on('disconnected', () => {
    console.log('MongoDB disconnected!');
    mongoose.connect(MONGO_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            server: {
                auto_reconnect: true
            }
        })
       //.then((result) => console.log("connection succeed"))
        //.catch((result) => console.log("connection failed : " + result));
});

mongoose.connect(MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        auto_reconnect: true,
        // server: {
        //     auto_reconnect: true
        // }
    })//
    //.then((result) => console.log("connection succeed"))
    //.catch((result) => console.log("connection failed : " + result));
*/

mongoose.Promise = Promise; // Set mongoose to use ES6 Promises.

const reconnectTimeout = 5000; // ms.

function connect() {
    mongoose.connect(MONGO_URL, { auto_reconnect: true, useNewUrlParser: true, useUnifiedTopology: true })
        .catch(() => { });
    // Catch the warning, no further treatment is required
    // because the Connection events are already doingß.
}

const db = mongoose.connection;

db.on('connecting', () => {
    console.info('Connecting to MongoDB...');
});

db.on('error', (error) => {
    console.error(`MongoDB connection error: ${error}`);
    mongoose.disconnect();
});

db.on('connected', () => {
    console.info('Connected to MongoDB!');
});

db.once('open', () => {
    console.info('MongoDB connection opened!');
});

db.on('reconnected', () => {
    console.info('MongoDB reconnected!');
});

db.on('disconnected', () => {
    console.error(`MongoDB disconnected! Reconnecting in ${reconnectTimeout / 1000}s...`);
    setTimeout(() => connect(), reconnectTimeout);
});

connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

router.get('/getData', (req, res) => {
    Data.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, messages: data });
    })
});

router.post('/putData', (req, res) => {

    const { id, message } = req.body;
    if ((!id && id !== 0) || !message) {
        return res.json({
            success: false,
            error: 'Invalid Inputs'
        });
    }
    let data = new Data();
    data.id = id;
    data.message = message;
    data.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    })
});

router.delete('/deleteData', (req, res) => {
    const { id } = req.body;
    Data.findByIdAndRemove(id, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

router.post('/updateData', (req, res) => {
    const { id, update } = req.body;
    Data.findByIdAndUpdate(id, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

app.use('/api', router);
var API_PORT = 3001;
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));