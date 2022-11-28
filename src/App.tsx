import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

    const toDoListTitle: string = "What to learn"


    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML & CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'React', isDone: true},

    ])
    const [filter, setFilter] = useState<FilterValueType>('all')
    console.log(filter)
    const removeTask = (taskId: string) => {
        const updateTasks = tasks.filter(task => task.id !== taskId)
        setTasks(updateTasks)
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title,               // title: title,
            isDone: false
        }
        /* const copyTasks = [...tasks]
         copyTasks.push(newTask)
         setTasks(copyTasks)*/
        setTasks([newTask, ...tasks])

    }


    const changeTodoListFilter = (nextFilterValue: FilterValueType) => {
        setFilter(nextFilterValue)
    }
    let tasksForRender: Array<TaskType> = [];

    const getFilteredTasks =
        (tasks:Array<TaskType>, filter: FilterValueType): Array <TaskType>=>{
        let  filteredTasks: Array<TaskType> = [];
            if (filter === 'all') {
                filteredTasks = tasks
            } else if (filter === "active") {
                filteredTasks = tasks.filter(task => task.isDone === false)
            } else if (filter === "completed") {
                filteredTasks = tasks.filter(task => task.isDone === true)
            }
            return filteredTasks
        }
    return (
        <div className="App">
            <ToDoList tasks={getFilteredTasks(tasks, filter)}
                      title={toDoListTitle}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeTodoListFilter={changeTodoListFilter}
            />
        </div>
    );
}

export default App;
