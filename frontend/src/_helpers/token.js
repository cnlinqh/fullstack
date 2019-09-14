import { store, history } from '../_helpers';
import CONSTANTS from '../_helpers/constants';
function getTokenHeader() {
    var current = store.getState().user.currentUser;
    if (current && current.token) {
        return { Authorization: current.token };
    } else {
        return {}
    }
}

function checkToken(error, dispatch) {
    if (error && error.response && error.response.status === 401) {
        let currentUser = {};
        dispatch({
            type: CONSTANTS.TOKEN_CHECK_FAILURE,
            currentUser
        });
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        history.push("/login");
    }
}

export const token = {
    getTokenHeader,
    checkToken
}