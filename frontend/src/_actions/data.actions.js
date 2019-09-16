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
                dispatch({
                    type: CONSTANTS.DATA_GET_FAILURE
                });
                token.checkToken(error, dispatch);
            });
    };
}

function editingData(id, message) {
    return dispatch => {
        dispatch({
            type: CONSTANTS.DATA_EDITING,
            message: {
                id, message
            }
        })
    }
}

function updateData(_id, id, message) {
    return dispatch => {
        dispatch({
            type: CONSTANTS.DATA_UPDATE_REQUEST
        });
        dataService.updateData(_id, id, message)
            .then(response => {
                var success = response.data.success;
                if (success) {
                    dispatch({
                        type: CONSTANTS.DATA_UPDATE_SUCCESS,
                        node: response.data.node
                    });
                } else {
                    dispatch({
                        type: CONSTANTS.DATA_UPDATE_FAILURE
                    });
                }
            }).catch(function (error) {
                dispatch({
                    type: CONSTANTS.DATA_UPDATE_FAILURE
                });
                token.checkToken(error, dispatch);
            });
    }
}

function removeData(_id) {
    return dispatch => {
        dispatch({
            type: CONSTANTS.DATA_REMOVE_REQUEST
        });
        dataService.removeData(_id)
            .then(response => {
                var success = response.data.success;
                if (success) {
                    dispatch({
                        type: CONSTANTS.DATA_REMOVE_SUCCESS,
                        node: response.data.node
                    });
                } else {
                    dispatch({
                        type: CONSTANTS.DATA_REMOVE_FAILURE
                    });
                }
            }).catch(function (error) {
                dispatch({
                    type: CONSTANTS.DATA_REMOVE_FAILURE
                });
                token.checkToken(error, dispatch);
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
                var success = response.data.success;
                if (success) {
                    dispatch({
                        type: CONSTANTS.DATA_CREATE_SUCCESS,
                        node: response.data.node
                    });
                } else {
                    dispatch({
                        type: CONSTANTS.DATA_CREATE_FAILURE
                    });
                }
            }).catch(function (error) {
                dispatch({
                    type: CONSTANTS.DATA_CREATE_FAILURE
                });
                token.checkToken(error, dispatch);
            });
    }
}
export const dataActions = {
    getDataList,
    editingData,
    updateData,
    removeData,
    createData
};