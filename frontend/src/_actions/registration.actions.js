import CONSTANTS from '../_helpers/constants'
import { userService } from '../_services';
function register(name, password) {
    return dispatch => {
        dispatch({
            type: CONSTANTS.REGISTER_REQUEST
        });
        userService.register(name, password)
            .then(response => {
                console.log(response);
                var success = response.data.success;
                if (success) {
                    dispatch({
                        type: CONSTANTS.REGISTER_SUCCESS
                    });
                } else {
                    dispatch({
                        type: CONSTANTS.REGISTER_FAILURE
                    });
                }
            }).catch(function (error) {
                console.log(error);
                dispatch({
                    type: CONSTANTS.REGISTER_FAILURE
                });
            });
    };
}

export const registrationActions = {
    register
};