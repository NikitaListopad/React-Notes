import React from "react";
import {Field, Formik} from "formik";
import {Button, Input} from "../elements";
import {Select} from "../elements/select";
import {noteValidation} from "../../validationShema/note";

export const CreateNoteForm = props => {

    return (
        <Formik
            initialValues={{
                content: '',
                title: '',
                color: ''
            }}
            validateOnBlur
            onSubmit={(values, {resetForm}) => {
                props.onSubmit(values, {resetForm})
            }}
            validationSchema={noteValidation}
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
                        <>
                        <Field as={Input}
                               name='title'
                               type='text'
                               value={values ? values.title : ''}
                               placeholder='Add title'
                               onChange={handleChange}
                               className='form-control w-25'
                               onBlur={handleBlur}
                        />
                            <Field as={Select}
                                   name='color'
                                   className='form-control w-50'
                                   items={props.colors}
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   placeholder="Select note's color"
                            />
                        </>
                        : null
                    }
                    <Field as={Input}
                           name='content'
                           type='text'
                           value={values ? values.content : ''}
                           className='form-control'
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