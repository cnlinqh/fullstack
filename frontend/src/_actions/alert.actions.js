import CONSTANTS from '../_helpers/constants'

function clear() {
    return dispatch => {
        dispatch({
            type: CONSTANTS.ALERT_CLEAR
        });
    }
}

function success(msg) {
    return dispatch => {
        dispatch({
            type: CONSTANTS.ALERT_SUCCESS,
            msg
        });
    }
}

function failure(msg) {
    return dispatch => {
        dispatch({
            type: CONSTANTS.ALERT_FAILURE,
            msg
        });
    }
}

export const alertActions = {
    clear,
    success,
    failure
};