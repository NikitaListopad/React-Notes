import React from "react";
import {Button} from "./button";

export const Navbar = props => {


    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between">
            <div>
            {props.items.map(item =>
                <Button
                    type='button'
                    onClick={props.onClick}
                    text={item.text}
                />
            )}
            </div>
            <Button
                type='button'
                className=''
                onClick={props.onSelectCategoryClick}
                text={props.text}
            />
        </nav>
    )
}