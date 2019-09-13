import { store } from '../_helpers'

function getTokenHeader() {
    var current = store.getState().user.currentUser;
    if (current && current.token) {
        return { Authorization: current.token };
    } else {
        return {}
    }

}

export const token = {
    getTokenHeader
}