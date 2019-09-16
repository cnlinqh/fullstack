import dotenv from 'dotenv';
import axios from "axios";
import { reqres } from '../_helpers'
dotenv.config();
var BACKEND_URL = `${process.env.REACT_APP_BACKEND_URL}`;

function register(name, password) {
    return axios
        .post(BACKEND_URL + "/user/signup", {
            name: name,
            password: password
        });
};

function login(name, password) {
    return axios.post(BACKEND_URL + "/user/accesstoken", {
        name: name,
        password: password
    })
};

function logout() {
    localStorage.setItem("currentUser", JSON.stringify({}));
}

function getUserList() {
    return axios.get(BACKEND_URL + "/user/list", {
        headers: reqres.prepareRequestHeaders()
    });
}

export const userService = {
    register,
    login,
    logout,
    getUserList
}