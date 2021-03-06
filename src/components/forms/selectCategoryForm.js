import React from "react";
import {Formik, Field} from "formik";
import {Button, Select} from "../elements";

export const SelectCategoryForm = props => {

    return (
        <Formik
            initialValues={{
                category: ''
            }}
            onSubmit={(values) => {
                props.onSubmit(values)
            }}>
            {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  dirty
              }) => (
                <div className='input-group'>
                    <Field as={Select}
                           name='category'
                           className='form-control'
                           items={props.items}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           placeholder='Select category to add'
                    />
                    <Button
                        disabled={!dirty}
                        type='submit'
                        onClick={handleSubmit}
                        text='Accept'
                    />
                </div>
            )}
        </Formik>
    )
}