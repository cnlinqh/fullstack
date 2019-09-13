import { combineReducers } from 'redux';
import { user } from './user.reducer';
import { data } from './data.reducer';
const rootReducer = combineReducers({
    user,
    data
})

// const rootReducer = function(state = {}, action){
//     return {
//         user: user(state.user, action)
//         data: data(state.data, action)
//     }
// }

export default rootReducer;