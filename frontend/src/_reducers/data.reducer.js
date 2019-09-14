import CONSTANTS from '../_helpers/constants';
var defaultState = { dataList: [] };

export function data(state = defaultState, action) {
    switch (action.type) {
        case CONSTANTS.DATA_GET_REQUEST:
            return Object.assign({}, state, { dataList: [] });
        case CONSTANTS.DATA_GET_SUCCESS:
            return Object.assign({}, state, { dataList: action.dataList });
        case CONSTANTS.DATA_GET_FAILURE:
            return Object.assign({}, state, { dataList: [] });
        default:
            return state;
    }
}
