import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    changeTodolistFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {


    const onAllClickHandler = () => props.changeTodolistFilter("all", props.todoListId);
    const onActiveClickHandler = () => props.changeTodolistFilter("active", props.todoListId);
    const onCompletedClickHandler = () => props.changeTodolistFilter("completed", props.todoListId);

    const removeTodolist = () => props.removeTodolist(props.todoListId)

    const addTask = (title: string) => props.addTask(title, props.todoListId)

    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(title, props.todoListId)
    }

    return <div>
        <h3>{/*{props.title}*/}
            <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
            <button onClick={removeTodolist}> X</button>
        </h3>

        <AddItemForm addItem={addTask}/>

        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.todoListId)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListId);
                    }

                    const changeTaskTitle = (title: string) => {
                        props.changeTaskTitle(t.id, title, props.todoListId)
                    }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>

                        <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
