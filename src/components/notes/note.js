import React from "react";

export const Note = props => {


    return(
        <>
            <div>
                <li id={props.id}>
                    <span>
                        {props.text}
                    </span>
                </li>
            </div>
        </>
    )
}