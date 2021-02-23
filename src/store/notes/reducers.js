import {DELETE_ALL_NOTES, CREATE_NOTE, DELETE_NOTE, EDIT_NOTE} from "./actions";
import {getInitialState} from "../../helpers/redux";

const initialState = getInitialState([])
export const notes = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NOTE:
            return {
                ...state,
                data:[action.payload, ...state.data],
            }
        case DELETE_NOTE:
            return {
                ...state,
                data: state.data.filter(note => note.id !== action.payload)
            }
        case EDIT_NOTE:
            return {
                ...state,
                data: state.data.map(note => note.id === action.payload.id ? action.payload : note)
            }
        case DELETE_ALL_NOTES:
            return {
                ...state,
                data: []
            }

        default: {
            return state
        }
    }
}