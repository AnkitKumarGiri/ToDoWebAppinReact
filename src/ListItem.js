import React from 'react';

function ListItem(props){
    return (
        <li className = {props.classVal} key= {props.keyval} >
            <input type = "checkbox" className = {props.itemType} onClick= {props.onSelect}></input>
            <div className = "select-list-item"  >
                {props.value}
            </div>
            <div>   </div>
            <a
                href = "#"
                className = "delete-list-item"
                onClick={props.onDelete}
            >X</a>
        </li>
    )
}

export default ListItem;