import * as yup from 'yup'

export const noteChars = {
    min: 1,
    max: 800
}

export const noteValidation = yup.object().shape({
    'content': yup.string().required('Please Enter your note text').min(noteChars.min).max(noteChars.max)
})