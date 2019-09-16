import dotenv from 'dotenv';
import axios from "axios";
import { reqres } from '../_helpers'
dotenv.config();
var BACKEND_URL = `${process.env.REACT_APP_BACKEND_URL}`;

function getDataList() {
    return axios.get(BACKEND_URL + "/api/getData", {
        headers: reqres.prepareRequestHeaders()
    });
};

function updateData(_id, id, message) {
    return axios.post(BACKEND_URL + "/api/updateData",
        {
            _id: _id,
            update: {
                id, message
            }
        },
        {
            headers: Object.assign({}, reqres.prepareRequestHeaders(), { "Content-Type": "application/json" })
        });
};

function removeData(_id) {
    return axios.delete(BACKEND_URL + "/api/deleteData",
        {
            headers: reqres.prepareRequestHeaders(),
            data: { _id }
        });
};

function createData(id, message) {
    return axios.post(BACKEND_URL + "/api/putData",
        { id, message },
        {
            headers: reqres.prepareRequestHeaders()
        });
};

export const dataService = {
    getDataList,
    updateData,
    removeData,
    createData
}