import CONSTANTS from '../_helpers/constants'
import { userService } from '../_services';
import { history, reqres } from '../_helpers';
function register(name, password) {
    return dispatch => {
        dispatch({
            type: CONSTANTS.REGISTER_REQUEST
        });
        userService.register(name, password)
            .then(response => {
                var success = response.data.success;
                if (success) {
                    dispatch({
                        type: CONSTANTS.REGISTER_SUCCESS
                    });
                    // history.push("/login");
                    dispatch({
                        type: CONSTANTS.ALERT_SUCCESS,
                        msg: "Sign up succeeded, please login"
                    });
                } else {
                    dispatch({
                        type: CONSTANTS.REGISTER_FAILURE
                    });
                    dispatch({
                        type: CONSTANTS.ALERT_FAILURE,
                        msg: "Sign up failed"
                    });
                }
            }).catch(function (error) {
                dispatch({
                    type: CONSTANTS.REGISTER_FAILURE
                });
                reqres.checkResponseError(error, dispatch);
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
                    dispatch({
                        type: CONSTANTS.ALERT_FAILURE,
                        msg: "Login failed, please try again"
                    });
                }
            }).catch(function (error) {
                let currentUser = {};
                dispatch({
                    type: CONSTANTS.LOGIN_FAILURE,
                    currentUser
                });
                localStorage.setItem("currentUser", JSON.stringify(currentUser));
                reqres.checkResponseError(error, dispatch);
            });
    };
}

function logout() {
    return dispatch => {
        dispatch({
            type: CONSTANTS.LOGOUT
        });
    }
}

function getUserList() {
    return dispatch => {
        dispatch({
            type: CONSTANTS.USER_GET_REQUEST
        });
        userService.getUserList()
            .then(response => {
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
                dispatch({
                    type: CONSTANTS.USER_GET_FAILURE
                });
                reqres.checkResponseError(error, dispatch);
            });
    };
}

function deleteUser(name) {
    return dispatch => {
        dispatch({
            type: CONSTANTS.USER_DELETE_REQUEST
        });
        userService.deleteUser(name)
            .then(response => {
                var success = response.data.success;
                if (success) {
                    dispatch({
                        type: CONSTANTS.USER_DELETE_SUCCESS,
                        name
                    });
                } else {
                    dispatch({
                        type: CONSTANTS.USER_DELETE_FAILURE
                    });
                }
            }).catch(function (error) {
                dispatch({
                    type: CONSTANTS.USER_DELETE_FAILURE
                });
                reqres.checkResponseError(error, dispatch);
            });
    };
}

export const userActions = {
    register,
    login,
    logout,
    getUserList,
    deleteUser
};