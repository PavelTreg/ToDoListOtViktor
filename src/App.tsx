import React from 'react';
import './App.css';
import ToDoList from "./ToDoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean

}

function App () {

    const toDoListTitle_1 = "What to learn"
    const toDoListTitle_2 = "What to buy"

    const tasks1: Array<TaskType> = [
        {id: 1, title: 'HTML & CSS', isDone: true},
        {id: 2, title: 'JS', isDone: false},
        {id: 3, title: 'React', isDone: true},

    ]
    const tasks2: Array<TaskType> = [
        {id: 4, title: 'Cola', isDone: true},
        {id: 5, title: 'Fanta', isDone: true},
        {id: 6, title: 'Sprite', isDone: false},

    ]

    return (
        <div className="App">
            <ToDoList tasks={tasks1} title={toDoListTitle_1}/>
            <ToDoList tasks={tasks2} title={toDoListTitle_2}/>
        </div>
    );
}

export default App;
