import React from "react";
import {Field, Formik} from "formik";
import {Button, Input} from "../elements";

export const CreateNoteForm = props => {

    return (
        <Formik
            initialValues={{
                content: '',
                title: ''
            }}
            validateOnBlur
            onSubmit={(values, {resetForm}) => {
                props.onSubmit(values, {resetForm})
            }}
        >
            {({
                  values,
                  handleChange,
                  handleBlur,
                  isValid,
                  handleSubmit,
                  dirty
              }) => (
                <div className='note-form'>
                    {!props.editMode ?
                        <Field as={Input}
                               name='title'
                               type='text'
                               value={values ? values.title : ''}
                               placeholder='Add title'
                               onChange={handleChange}
                               onBlur={handleBlur}
                        />
                        : null
                    }
                    <Field as={Input}
                           name='content'
                           type='text'
                           value={values ? values.content : ''}
                           placeholder='Write your text'
                           onChange={handleChange}
                           onBlur={handleBlur}
                    />
                    <Button disabled={!isValid || !dirty}
                            type='submit'
                            onClick={handleSubmit}
                            text={props.text}
                    />
                </div>
            )}
        </Formik>
    )
}