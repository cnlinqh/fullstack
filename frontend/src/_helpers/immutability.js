import { fromJS } from 'immutable'

function cloneState(store) {
    const clone = fromJS(store);
    return clone.toJS();
}

export const immutability = {
    cloneState: cloneState
}