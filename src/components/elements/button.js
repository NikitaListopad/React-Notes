import React from 'react'

export const Button = props => {

    return (
        <button type={props.type}
                className={props.className ? props.className :'btn btn-primary'}
                onClick={props.onClick}
                disabled={props.disabled}
        >
            {props.text}
        </button>
    )
}