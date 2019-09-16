import CONSTANTS from '../_helpers/constants';
import { immutability } from '../_helpers';
var userlocal = localStorage.getItem("currentUser");
var defaultState = { status: "NewReg", currentUser: JSON.parse(userlocal), userList: [] };

export function user(state = defaultState, action) {
    var cloneState;
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

        case CONSTANTS.TOKEN_CHECK_FAILURE:
            return Object.assign({}, state, { currentUser: action.currentUser });

        case CONSTANTS.LOGOUT:
            cloneState = immutability.cloneState(state);
            cloneState.currentUser = {};
            return cloneState;

        case CONSTANTS.USER_GET_REQUEST:
            return Object.assign({}, state, { userList: [] });
        case CONSTANTS.USER_GET_SUCCESS:
            return Object.assign({}, state, { userList: action.userList });
        case CONSTANTS.USER_GET_FAILURE:
            return Object.assign({}, state, { userList: [] });

        case CONSTANTS.USER_DELETE_REQUEST:
            return state;
        case CONSTANTS.USER_DELETE_SUCCESS:
            cloneState = immutability.cloneState(state);
            cloneState.userList = cloneState.userList.filter(user => {
                return user.name !== action.name
            });
            return cloneState;
        case CONSTANTS.USER_DELETE_FAILURE:
            return state;


        default:
            return state;
    }
}