import dotenv from 'dotenv';
import axios from "axios";
import { token } from '../_helpers'
dotenv.config();
var BACKEND_URL = `${process.env.REACT_APP_BACKEND_URL}`;
console.log(BACKEND_URL);

function getDataList() {
    console.log("get data list")
    return axios.get(BACKEND_URL + "/api/getData", {
        headers: token.getTokenHeader()
    });
};

function updateData(id, message) {
    return axios.post(BACKEND_URL + "/api/updateData",
        { id, message },
        {
            headers: token.getTokenHeader()
        });
};

function removeData(id) {
    console.log("removeData")
    return axios.delete(BACKEND_URL + "/api/deleteData",
        {
            headers: token.getTokenHeader(),
            data: { id }
        });
};

function createData(id, message) {
    console.log("createData")
    return axios.post(BACKEND_URL + "/api/putData",
        { id, message },
        {
            headers: token.getTokenHeader()
        });
};

export const dataService = {
    getDataList,
    updateData,
    removeData,
    createData
}