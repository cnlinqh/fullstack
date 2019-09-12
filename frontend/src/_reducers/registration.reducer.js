import CONSTANTS from '../_helpers/constants';
var defaultState = { status: "New" };
export function registration(state = defaultState, action) {
    switch (action.type) {
        case CONSTANTS.REGISTER_REQUEST:
            return Object.assign({}, state, { status: "Registering" });
        case CONSTANTS.REGISTER_SUCCESS:
            return Object.assign({}, state, { status: "Success" });
        case CONSTANTS.REGISTER_FAILURE:
            return Object.assign({}, state, { status: "Fail" });
        default:
            return state;
    }
}