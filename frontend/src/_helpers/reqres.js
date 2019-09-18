import { store, history } from '.';
import CONSTANTS from './constants';
function prepareRequestHeaders() {
    var current = store.getState().user.currentUser;
    if (current && current.token) {
        return { Authorization: current.token };
    } else {
        return {}
    }
}

function checkResponseError(error, dispatch) {
    if (error && error.response && error.response.status === 401) {
        let currentUser = {};
        if (dispatch) {
            dispatch({
                type: CONSTANTS.TOKEN_CHECK_FAILURE,
                currentUser
            });
        }
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        history.push("/login");
        dispatch({
            type: CONSTANTS.ALERT_FAILURE,
            msg: "Authentication failed, please login"
        });
    } else {
        if (error.toString() === "Error: Network Error") {
            if (dispatch) {
                dispatch({
                    type: CONSTANTS.ALERT_FAILURE,
                    msg: "Error: Network Error"
                })
            }
        }
    }
}

export const reqres = {
    prepareRequestHeaders,
    checkResponseError
}