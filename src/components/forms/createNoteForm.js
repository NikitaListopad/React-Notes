import React from "react";
import {Field, Formik} from "formik";
import {Button, Input} from "../elements";
import {Select} from "../elements/select";

export const CreateNoteForm = props => {

    return (
        <Formik
            initialValues={{
                content: '',
                title: '',
                color: '',
                labels: []
            }}
            validateOnBlur
            onSubmit={(values, {resetForm}) => {
                props.onSubmit(values, {resetForm})
            }}
            validationSchema={props.validation}
        >
            {({
                  values,
                  handleChange,
                  handleBlur,
                  isValid,
                  handleSubmit,
                  dirty,
                  setFieldValue
              }) => (
                <div className='container'>
                    <div className='note-form w-100'>
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
                    <div className='d-flex w-100'>
                        <div className='container-md border'>
                            {props.labels.map(label =>
                                <Field as={Button}
                                       key={label.id}
                                       name='labels'
                                       type='button'
                                       className='btn btn-link'
                                       onDoubleClick={() => {
                                           setFieldValue('labels', [...values.labels, label])
                                       }}
                                       text={label.value}
                                />
                            )}
                        </div>
                        <div className='container-md border'>
                            <>
                                {values.labels.length <= 0 ?
                                    <span className='text-muted'>Add labels to your note</span>
                                    :
                                    values.labels.map(label =>
                                        <span key={label.id}>&ensp;{label.value}</span>
                                    )
                                }
                            </>
                        </div>
                    </div>
                </div>
            )}
        </Formik>
    )
}