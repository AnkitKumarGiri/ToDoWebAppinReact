import React from 'react';

function ListItem(props){
    return (
        <li className = {props.classVal} key= {props.keyval} >
            <div className = "select-list-item" onClick= {props.onSelect} >
                {props.value}
            </div>
            <button
                className = "delete-list-item"
                onClick={props.onDelete}
            >X</button>
        </li>
    )
}

export default ListItem;