import CONSTANTS from '../_helpers/constants';
var userlocal = localStorage.getItem("currentUser");
var defaultState = { status: "NewReg", currentUser: JSON.parse(userlocal) };

export function user(state = defaultState, action) {
    switch (action.type) {
        case CONSTANTS.REGISTER_REQUEST:
            return Object.assign({}, state, { status: "Registering" });
        case CONSTANTS.REGISTER_SUCCESS:
            return Object.assign({}, state, { status: "Success" });
        case CONSTANTS.REGISTER_FAILURE:
            return Object.assign({}, state, { status: "Fail" });
        case CONSTANTS.LOGIN_REQURST:
            return Object.assign({}, state, { currentUser: action.currentUser });
        case CONSTANTS.LOGIN_SUCCESS:
            return Object.assign({}, state, { currentUser: action.currentUser });
        case CONSTANTS.LOGIN_FAILURE:
            return Object.assign({}, state, { currentUser: action.currentUser });
        default:
            return state;
    }
}