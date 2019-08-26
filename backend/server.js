import mongoose from 'mongoose';
import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';
import Data from './data';
// const mongoose = require('mongoose');
// const express = require('express');
// var cors = require('cors');
// const bodyParser = require('body-parser');
// const logger = require('morgan');
// const Data = require('./data');
const app = express();

app.use(cors());

const router = express.Router();

mongoose.connect('mongodb://root:Sybase123@10.59.161.81:27017/app?authSource=admin',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((result) => console.log("connection succeed"))
    .catch((result) => console.log("connection failed : " + result));

let db = mongoose.connection;

db.once('open', () => console.log('open to database'));

db.on('error', () => console.log("connection error"));

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
