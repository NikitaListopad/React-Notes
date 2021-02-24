import React from 'react'

export const Select = props => {

    return (
        <>
            <select onChange={props.onChange} {...props}>
                <option label={props.placeholder} disabled selected/>
                {props.items.map((item, index) =>
                    <option key={index} value={item.value}>{item.text}</option>
                )}

            </select>
        </>
    )
}