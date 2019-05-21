import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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

class List extends React.Component {

    constructor(props){
        super(props);
        this.state = {
           todos:[{
            text: null,
            display: false,
           }],
           completed:[{
            text: null,
            display: false,
           }],
           buffer: '',
        }
    }

    onInputChange = (e) => {
        this.setState({
            buffer: e.target.value
        })
    }

    AddNewItem = () => {
        const  new_item = this.state.buffer;
        if(new_item.length === 0) {
            return;
        }

        const todos = this.state.todos.slice();
        this.setState({
            todos: todos.concat([{
                text: new_item,
                display: true,
            }]),
        })
    }

    onKeyPress = (e) => {
        if(e.key === 'Enter'){
            this.AddNewItem();
        }
    }
    
    renderInputRow(){
        return (
            <InputRow
                maxLength = {27}
                onChange = {this.onInputChange}
                placeholder = {"New Item..."}
                onClick = {this.AddNewItem}
                onKeyPress = {this.onKeyPress}
            />
        );
    }
    
    onDeleteToDo(num){
        const todos = this.state.todos.slice();
        todos[num].display = false;
        this.setState({
            todos: todos,
        });
    }

    onDeleteCompleted(num){
        const completed = this.state.completed.slice();
        completed[num].display = false;
        this.setState({
            completed: completed,
        });
    }

    onSelectTodo(num){
        const new_item = this.state.todos[num].text;
        if(new_item.length === 0)
            return;
        const completed = this.state.completed.slice();
        this.setState({
            completed: completed.concat([{
                text: new_item,
                display: true,
            }]),
        });
        this.onDeleteToDo(num);
    }
    render() {

        const todos = this.state.todos;
        const completed = this.state.completed;
        
        const todo_list = todos.map((item, num) => {
            // console.log(item);
            // console.log(num);
            const text = item.text;
            const display = item.display ? 'show list' : 'hide list';
            return (
                <ListItem
                    keyval = {num}
                    value = {text}
                    onSelect = { () => this.onSelectTodo(num) }
                    onDelete = { () => this.onDeleteToDo(num) }
                    classVal = {display}
                />
            )
        });
        
        const completed_list = completed.map((item, num) => {
            // console.log(item);
            // console.log(num);
            const text = item.text;
            const display = item.display ? 'show list' : 'hide list';
            return (
                <ListItem
                    keyval = {num}
                    value = {text}
                    onSelect = { () => {return null} }
                    onDelete = { () => this.onDeleteCompleted(num) }
                    classVal = {display}
                />
            )
        });

        return (
            <div className = "list">
                <div className = "things-to-do">
                    <div className = "heading" >
                        <h1> To Do List </h1>
                    </div> 
                    {this.renderInputRow()}
                    <ul>{todo_list}</ul>
                </div>

                <div className = "done">
                    <h1> Completed List </h1>
                    <ul>{completed_list}</ul>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <List />,
    document.getElementById('root')
);