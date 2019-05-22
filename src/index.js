import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ListItem from './ListItem.js';
import InputRow from './InputRow.js';

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
           input_box_text: '',
        }
    }

    onInputChange = (e) => {
        this.setState({
            input_box_text: e.target.value
        })
    }

    addNewItem = () => {
        const  new_item = this.state.input_box_text;
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
                onClick = {this.addNewItem}
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
            const type = 'completed';
            return (
                <ListItem
                    keyval = {num}
                    value = {text}
                    onSelect = { () => {return null} }
                    onDelete = { () => this.onDeleteCompleted(num) }
                    classVal = {display}
                    itemType = {type}
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