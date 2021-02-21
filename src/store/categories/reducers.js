import {getInitialState} from "../../helpers/redux";
import {ADD_TO_HOME, ADD_TO_SCHOOL, ADD_TO_WORK} from "./actions";


const initialState = getInitialState([])
export const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_SCHOOL:
            return {
                ...state,
                school: action.payload
            }
        case ADD_TO_WORK:
            return {
                ...state,
                work: action.payload
            }
        case ADD_TO_HOME:
            return {
                ...state,
                home: action.payload
            }
        default: {
            return state
        }
    }
}