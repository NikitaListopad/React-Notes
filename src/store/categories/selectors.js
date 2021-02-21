

import {createSelector} from 'reselect';

const categories = state => state.categoriesReducer
export const categoriesSelector = createSelector(categories, categories => (categories))