import dotenv from 'dotenv';
import axios from "axios";
dotenv.config();
var BACKEND_URL = `${process.env.REACT_APP_BACKEND_URL}`;
console.log(BACKEND_URL);

function register(name, password) {

    console.log("register to " + BACKEND_URL);
    return axios
        .post(BACKEND_URL + "/user/signup", {
            name: name,
            password: password
        });
};

function login(name, password) {
    console.log("login as  " + name);
    return axios.post(BACKEND_URL + "/user/accesstoken", {
        name: name,
        password: password
    })
};

export const userService = {
    register,
    login
}