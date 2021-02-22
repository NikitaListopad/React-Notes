import {getInitialState, toDelete} from "../../helpers/redux";
import {
    ADD_TO_HOME,
    ADD_TO_SCHOOL,
    ADD_TO_WORK,
    DELETE_FROM_HOME,
    DELETE_FROM_SCHOOL,
    DELETE_FROM_WORK
} from "./actions";


const initialState = getInitialState([])
export const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_SCHOOL:
            return {
                ...state,
                school: [...action.payload, ...state.school.filter(note => note.id !== (action.payload.find(item => item.id === note.id)).id)]
            }
        case ADD_TO_WORK:
            return {
                ...state,
                work: [...action.payload, ...state.work.filter(note => note.id !== (action.payload.find(item => item.id === note.id)).id)]
            }
        case ADD_TO_HOME:
            return {
                ...state,
                home: [...action.payload, ...state.home.filter(note => note.id !== (action.payload.find(item => item.id === note.id)).id)]
            }
        case DELETE_FROM_SCHOOL:
            return {
                ...state,
                school: state.school.filter(note => note.id !== action.payload)
            }
        case DELETE_FROM_HOME:
            return {
                ...state,
                home: state.home.filter(note => note.id !== action.payload)
            }
        case DELETE_FROM_WORK:
            return {
                ...state,
                work: state.work.filter(note => note.id !== action.payload)
            }
        default: {
            return state
        }
    }
}