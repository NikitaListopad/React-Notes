export const getInitialState = data => ({
    loader: false,
    data,
    error: false
})

export const success = (action) => `${action}_SUCCESS`
export const error = (action) => `${action}_SUCCESS`

