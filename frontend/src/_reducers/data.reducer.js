import CONSTANTS from '../_helpers/constants';
import { immutability } from '../_helpers';
var defaultState = { dataList: [] };

export function data(state = defaultState, action) {
    var cloneState;
    switch (action.type) {
        case CONSTANTS.DATA_GET_REQUEST:
            return Object.assign({}, state, { dataList: [] });
        case CONSTANTS.DATA_GET_SUCCESS:
            return Object.assign({}, state, { dataList: action.dataList });
        case CONSTANTS.DATA_GET_FAILURE:
            return Object.assign({}, state, { dataList: [] });


        case CONSTANTS.DATA_EDITING:
            let { id, message } = action.message;
            cloneState = immutability.cloneState(state);
            cloneState.dataList = cloneState.dataList.map(msg => {
                if (msg.id === id) {
                    msg.message = message;
                }
                return msg;
            })
            return cloneState;

        case CONSTANTS.DATA_UPDATE_REQUEST:
            return state;
        case CONSTANTS.DATA_UPDATE_SUCCESS:
            return state;
        case CONSTANTS.DATA_UPDATE_FAILURE:
            return state;


        case CONSTANTS.DATA_REMOVE_REQUEST:
            return state;
        case CONSTANTS.DATA_REMOVE_SUCCESS:
            return state;
        case CONSTANTS.DATA_REMOVE_FAILURE:
            return state;


        case CONSTANTS.DATA_CREATE_REQUEST:
            return state;
        case CONSTANTS.DATA_CREATE_SUCCESS:
            cloneState = immutability.cloneState(state);
            cloneState.dataList.push(action.node);
            return cloneState;
        case CONSTANTS.DATA_CREATE_FAILURE:
            return state;

        default:
            return state;
    }
}
