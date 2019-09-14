import CONSTANTS from '../_helpers/constants'
import { dataService } from '../_services';
import { token } from '../_helpers';

function getDataList() {
    return dispatch => {
        dispatch({
            type: CONSTANTS.DATA_GET_REQUEST
        });
        dataService.getDataList()
            .then(response => {
                console.log(response);
                var success = response.data.success;
                if (success) {
                    dispatch({
                        type: CONSTANTS.DATA_GET_SUCCESS,
                        dataList: response.data.messages
                    });
                } else {
                    dispatch({
                        type: CONSTANTS.DATA_GET_FAILURE
                    });
                }
            }).catch(function (error) {
                console.log(error);
                dispatch({
                    type: CONSTANTS.DATA_GET_FAILURE
                });
                token.checkToken(error, dispatch);
            });
    };
}
function updateData(id, message) {
    return dispatch => {
        dispatch({
            type: CONSTANTS.DATA_UPDATE_REQUEST
        });
        dataService.updateData(id, message)
            .then(response => {
                console.log(response);
                var success = response.data.success;
                if (success) {
                    dispatch({
                        type: CONSTANTS.DATA_UPDATE_SUCCESS
                    });
                    getDataList()(dispatch);
                } else {
                    dispatch({
                        type: CONSTANTS.DATA_UPDATE_FAILURE
                    });
                }
            }).catch(function (error) {
                console.log(error);
                dispatch({
                    type: CONSTANTS.DATA_UPDATE_FAILURE
                });
            });
    }
}

function removeData(id) {
    return dispatch => {
        dispatch({
            type: CONSTANTS.DATA_REMOVE_REQUEST
        });
        dataService.removeData(id)
            .then(response => {
                console.log(response);
                var success = response.data.success;
                if (success) {
                    dispatch({
                        type: CONSTANTS.DATA_REMOVE_SUCCESS
                    });
                    getDataList()(dispatch);
                } else {
                    dispatch({
                        type: CONSTANTS.DATA_REMOVE_FAILURE
                    });
                }
            }).catch(function (error) {
                console.log(error);
                dispatch({
                    type: CONSTANTS.DATA_REMOVE_FAILURE
                });
            });
    }
}

function createData(id, message) {
    return dispatch => {
        dispatch({
            type: CONSTANTS.DATA_CREATE_REQUEST
        });
        dataService.createData(id, message)
            .then(response => {
                console.log(response);
                var success = response.data.success;
                if (success) {
                    dispatch({
                        type: CONSTANTS.DATA_CREATE_SUCCESS
                    });
                    getDataList()(dispatch);
                } else {
                    dispatch({
                        type: CONSTANTS.DATA_CREATE_FAILURE
                    });
                }
            }).catch(function (error) {
                console.log(error);
                dispatch({
                    type: CONSTANTS.DATA_CREATE_FAILURE
                });
            });
    }
}
export const dataActions = {
    getDataList,
    updateData,
    removeData,
    createData
};