import React from "react";
import {Field, Formik} from "formik";
import {Button, Input} from "./elements";

export const CreateNoteForm = props => {

    return (
        <Formik
            initialValues={{
                content: ''
            }}
            validateOnBlur
            onSubmit={(values, {resetForm}) => {
                props.onSubmit(values, {resetForm})
            }}
            validationSchema={props.validation}
        >
            {({
                  values,
                  errors,
                  handleChange,
                  handleBlur,
                  isValid,
                  handleSubmit,
                  dirty
              }) => (
                <div className='note-form'>
                    <Field as={Input}
                           name='content'
                           type='text'
                           value={values ? values.content : ''}
                           placeholder='Write your text'
                           onChange={handleChange}
                           onBlur={handleBlur}
                           errors={errors.content}
                    />
                    <Button disabled={!isValid || !dirty}
                            type='submit'
                            onClick={handleSubmit}
                            text='Добавить'
                    />
                </div>
            )}
        </Formik>
    )
}