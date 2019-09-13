import dotenv from 'dotenv';
import axios from "axios";
dotenv.config();
var BACKEND_URL = `${process.env.REACT_APP_BACKEND_URL}`;
console.log(BACKEND_URL);

function get() {

};

function update() {
    
};

function remove() {
    
};

function create() {
    
};

export const dateService = {
    get,
    update,
    remove,
    create
}