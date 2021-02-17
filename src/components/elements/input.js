import React from 'react'

export const Input = props => {
    const hasError = props.errors && props.touched;

    return (
        <>
            <input type={props.type}
                   name={props.name}
                   id={props.id}
                   onBlur={props.onBlur}
                   value={props.value}
                   className={`form-control ${hasError ? 'is-invalid' : ''} ${props.className ? props.className : ''}`}
                   onChange={props.onChange}
                   placeholder={props.placeholder}
                   maxLength={props.maxlength}
            />
        </>
    )
}