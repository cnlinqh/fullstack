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


        case CONSTANTS.DATA_EDITING:
            let { id, message } = action.message;
            let newState = Object.assign({}, state);
            newState.dataList = newState.dataList.map(msg => {
                if (msg.id == id) {
                    msg.message = message;
                }
                return msg;
            })
            return newState;

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
            return state;
        case CONSTANTS.DATA_CREATE_FAILURE:
            return state;


        default:
            return state;
    }
}
