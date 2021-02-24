import React from 'react'

export const Input = props => {

    return (
        <>
            <input type={props.type}
                   name={props.name}
                   id={props.id}
                   onBlur={props.onBlur}
                   value={props.value}
                   className={props.className ? props.className : `form-control`}
                   onChange={props.onChange}
                   placeholder={props.placeholder}
                   maxLength={props.maxlength}
            />
        </>
    )
}