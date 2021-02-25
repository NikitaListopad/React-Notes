export const getInitialState = data => ({
    loader: false,
    data,
    categories: [{id: 1, text: 'All', value: '', data: [], subcategories: []}],
    subcategories: [],
    labels: [{id: 1, value: 'Everyday'}, {id: 2,value: 'InMorning'}, {id: 3, value: 'Evening'}],
    error: false
})

