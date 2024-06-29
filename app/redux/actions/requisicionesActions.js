import { SET_SELECTED_REQUISICION } from '../constants/costants';

export function setSelectedRequisicion(data) {
    return {
        type: SET_SELECTED_REQUISICION,
        data
    }
}