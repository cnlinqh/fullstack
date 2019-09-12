import { combineReducers } from 'redux';
import { user } from './user.reducer';
const rootReducer = combineReducers({
    user
})

// const rootReducer = function(state = {}, action){
//     return {
//         registration: registration(state.registration, action)
//     }
// }

export default rootReducer;