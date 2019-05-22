import React from 'react';

function InputRow(props){
    return (
        <div className = "input-row">
            <input 
                id = "to-do-input"
                type = "text"
                placeholder = {props.placeholder}
                maxLength = {props.maxLength}
                onChange = {props.onChange}
                onKeyPress = {props.onKeyPress}
            ></input>
            <button 
                id="enter"
                onClick = {props.onClick}
            >Add</button>
        </div>
    )
}

export default InputRow;