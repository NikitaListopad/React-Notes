export const getInitialState = data => ({
    loader: false,
    data,
    categories: [{id: 1, text: 'All', value: '', data: [], subcategories: []}],
    subcategories: [],
    error: false
})

