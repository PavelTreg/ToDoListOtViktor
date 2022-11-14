import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
export type FilterValueType = 'all' | 'active' | 'completed'
function App() {

    const toDoListTitle: string = "What to learn"


    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML & CSS', isDone: true},
        {id: 2, title: 'JS', isDone: false},
        {id: 3, title: 'React', isDone: true},

    ])
    const [filter, setFilter] = useState<FilterValueType>('all')
    console.log(filter)
    const removeTask = (taskId: number) => {
        const updateTasks = tasks.filter(task => task.id !== taskId)
        setTasks(updateTasks)
    }
const changeTodoListFilter = (nextFilterValue:FilterValueType) => {
        setFilter(nextFilterValue)
}
let tasksForRender: Array<TaskType> = [];
    if(filter === 'all') {
        tasksForRender = tasks
    }
    else if (filter === "active"){
        tasksForRender = tasks.filter(task => task.isDone === false)

    }
    else if (filter === "completed"){
        tasksForRender = tasks.filter(task => task.isDone === true)

    }

    return (
        <div className="App">
            <ToDoList tasks={tasksForRender}
                      title={toDoListTitle}
                      removeTask={removeTask}
                      changeTodoListFilter = {changeTodoListFilter}
            />
        </div>
    );
}

export default App;
