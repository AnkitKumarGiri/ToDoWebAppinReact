import React from 'react';

class ListItem extends React.PureComponent {

    handleChange = () => {
        this.props.onSelect(this.props.index);
    }

    
    handleClick = () => {
        this.props.onDelete(this.props.index);
    }

    render(){
        return (
            <li className = {this.props.classVal} >
                <input
                    type = "checkbox"
                    className = {this.props.itemType}
                    onChange= { this.handleChange }
                    checked = {this.props.checked}
                />
                <div className = "select-list-item"  >
                    {this.props.value}
                </div>
                <div>   </div>
                <a
                    href = "#"
                    className = "delete-list-item"
                    onClick= { this.handleClick }
                >X</a>
            </li>
        )
    }
}

export default ListItem;