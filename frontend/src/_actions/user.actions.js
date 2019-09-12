import CONSTANTS from '../_helpers/constants'
import { userService } from '../_services';
import { history } from '../_helpers';
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
                    history.push("/login");
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

function login(name, password) {
    return dispatch => {
        dispatch({
            type: CONSTANTS.LOGIN_REQURST
        });
        userService.login(name, password)
            .then(response => {
                console.log(response);
                var success = response.data.success;
                if (success) {
                    dispatch({
                        type: CONSTANTS.LOGIN_SUCCESS,
                        token: response.data.token
                    });
                    history.push("/");
                } else {
                    dispatch({
                        type: CONSTANTS.LOGIN_FAILURE
                    });
                }
            }).catch(function (error) {
                console.log(error);
                dispatch({
                    type: CONSTANTS.LOGIN_FAILURE
                });
            });
    };
}
export const userActions = {
    register,
    login
};