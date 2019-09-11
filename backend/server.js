
import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';
import db from './mongo';
import datarouter from './routes/data';
import userrouter from './routes/user';

db();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use('/api', datarouter);
app.use('/user', userrouter);
var API_PORT = 3001;
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));