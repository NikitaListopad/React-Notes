import {createSelector} from 'reselect';

const notes = state => state.notes
export const notesSelector = createSelector(notes, notes => (notes))