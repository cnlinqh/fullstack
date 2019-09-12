import { combineReducers } from 'redux';
import { registration } from './registration.reducer';
const rootReducer = combineReducers({
    registration
})

// const rootReducer = function(state = {}, action){
//     return {
//         registration: registration(state.registration, action)
//     }
// }

export default rootReducer;