import React from "react";
import {Button} from "./button";
import {Link} from "react-router-dom";

export const Navbar = props => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between">
            <div>
                {props.items.map((item, index) =>
                    <Link to={item.value} key={index}>
                        <Button
                            type='button'
                            key={index}
                            onClick={props.onClick}
                            text={item.text}
                        />
                    </Link>
                )}
            </div>
            {!props.path ?
                <Button
                    type='button'
                    className=''
                    onClick={props.onSelectCategoryClick}
                    text={props.text}
                />
                :
                <Link to='/'>
                    <Button
                        type='button'
                        className=''
                        onClick={props.onDeleteCategoryClick}
                        text={props.selectButtonText}
                    />
                </Link>
            }
        </nav>
    )
}