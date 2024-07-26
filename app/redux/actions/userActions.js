import { SET_USER_DATA, CLEAR_USER_DATA, UPDATE_USER_DATA } from '../constants/costants';

export function setUserData(data) {
    return {
        type: SET_USER_DATA,
        data
    }
}

export function updateUserData(data) {
    return {
        type: UPDATE_USER_DATA,
        data
    }
}

export function clearUserData() {
    return {
        type: CLEAR_USER_DATA
    }
}