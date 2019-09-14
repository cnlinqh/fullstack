import CONSTANTS from '../_helpers/constants'
import { userService } from '../_services';
import { history, token } from '../_helpers';
function register(name, password) {
    return dispatch => {
        dispatch({
            type: CONSTANTS.REGISTER_REQUEST
        });
        userService.register(name, password)
            .then(response => {
                console.log(response);
                var success = response.data.success;
                if (success) {
                    dispatch({
                        type: CONSTANTS.REGISTER_SUCCESS
                    });
                    history.push("/login");
                } else {
                    dispatch({
                        type: CONSTANTS.REGISTER_FAILURE
                    });
                }
            }).catch(function (error) {
                console.log(error);
                dispatch({
                    type: CONSTANTS.REGISTER_FAILURE
                });
            });
    };
}

function login(name, password) {
    return dispatch => {
        let currentUser = {};
        dispatch({
            type: CONSTANTS.LOGIN_REQURST,
            currentUser
        });
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        userService.login(name, password)
            .then(response => {
                console.log(response);
                var success = response.data.success;
                if (success) {
                    let currentUser = {
                        name: response.data.name,
                        token: response.data.token
                    }
                    dispatch({
                        type: CONSTANTS.LOGIN_SUCCESS,
                        currentUser
                    });
                    localStorage.setItem("currentUser", JSON.stringify(currentUser));
                    history.push("/");
                } else {
                    let currentUser = {};
                    dispatch({
                        type: CONSTANTS.LOGIN_FAILURE,
                        currentUser
                    });
                    localStorage.setItem("currentUser", JSON.stringify(currentUser));
                }
            }).catch(function (error) {
                let currentUser = {};
                dispatch({
                    type: CONSTANTS.LOGIN_FAILURE,
                    currentUser
                });
                localStorage.setItem("currentUser", JSON.stringify(currentUser));
            });
    };
}

function getUserList() {
    return dispatch => {
        dispatch({
            type: CONSTANTS.USER_GET_REQUEST
        });
        userService.getUserList()
            .then(response => {
                console.log(response);
                var success = response.data.success;
                if (success) {
                    dispatch({
                        type: CONSTANTS.USER_GET_SUCCESS,
                        userList: response.data.userList
                    });
                } else {
                    dispatch({
                        type: CONSTANTS.USER_GET_FAILURE
                    });
                }
            }).catch(function (error) {
                console.log(error);
                dispatch({
                    type: CONSTANTS.USER_GET_FAILURE
                });
                token.checkToken(error, dispatch);
            });
    };
}

export const userActions = {
    register,
    login,
    getUserList
};