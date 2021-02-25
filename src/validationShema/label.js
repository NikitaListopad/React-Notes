import * as yup from 'yup'

const labelChard = {
    min: 1,
    max: 50
}
const labelMatches = /\w+/

export const labelValidation = yup.object().shape({
    'content': yup.string().required("Please write your label's name").matches(labelMatches, 'Spaces will be deleting').min(labelChard.min).max(labelChard.max)
})