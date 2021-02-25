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
                        {!props.editMode && !props.createWindow ?
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
                               placeholder={props.createWindow ? 'Write name for your element' : 'Write your text'}
                               onChange={handleChange}
                               onBlur={handleBlur}
                        />
                        <Button disabled={!isValid || !dirty}
                                type='submit'
                                onClick={handleSubmit}
                                text={props.text}
                        />
                    </div>
                    {!props.createWindow ?
                    <div className='d-flex w-100'>
                        <div className='container-md border'>
                            <Button
                                onClick={props.onCreateLabelClick}
                                text='Create own label'
                                type='button'
                                className='btn btn-link font-weight-bold text-decoration-none'
                            />
                            {props.labels.map(label =>
                                <Field as={Button}
                                       key={label.id}
                                       name='labels'
                                       type='button'
                                       className='btn btn-link '
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
                                    <span className='text-muted'>Use double click to add labels for your Note</span>
                                    :
                                    values.labels.map(label =>
                                        <span key={label.id}>&ensp;{label.value}</span>
                                    )
                                }
                            </>
                        </div>
                    </div>
                    : null
                    }
                </div>
            )}
        </Formik>
    )
}