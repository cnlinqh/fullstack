import { combineReducers } from 'redux';
import { user } from './user.reducer';
import { data } from './data.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
    user,
    data,
    alert
})

// const rootReducer = function(state = {}, action){
//     return {
//         user: user(state.user, action)
//         data: data(state.data, action)
//         alert: alert(state.alert, action)
//     }
// }

export default rootReducer;