import mongoose from 'mongoose';
import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv'
import datarouter from './routes/data';
import userrouter from './routes/user';

dotenv.config();
var MONGO_URL = `${process.env.MONGO_URL}`;
console.log("MONGO_URL: "+ MONGO_URL);

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use('/api', datarouter);
app.use('/user', userrouter);

mongoose.Promise = Promise; // Set mongoose to use ES6 Promises.
const reconnectTimeout = 5000; // ms.
function connect() {
    mongoose.connect(MONGO_URL, { auto_reconnect: true, useNewUrlParser: true, useUnifiedTopology: true })
        .catch(() => { });
    // Catch the warning, no further treatment is required
    // because the Connection events are already doing.
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

var API_PORT = 3001;
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));