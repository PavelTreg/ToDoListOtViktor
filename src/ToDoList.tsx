import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, Grid, IconButton} from "@mui/material";
import {DeleteForever, DisabledByDefault} from "@mui/icons-material";

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
        <Grid container
              sx = {{p:' 5px 10px'}}
        >
        <h3>
            <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist} color='error'>
                < DisabledByDefault/>
            </IconButton>
        </h3>
        </Grid>
        <Grid container
              sx = {{p:' 5px 10px'}}
        >
        <AddItemForm addItem={addTask}/>
        </Grid>
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

                        <Checkbox onChange={onChangeHandler}
                                  checked={t.isDone}
                        color = 'success'
                                  size='small'
                        />
                        <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                        <IconButton aria-label="delete" onClick={onClickHandler} color='error' size='small'>
                            <DeleteForever/>
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <ButtonGroup variant="contained" aria-label="outlined primary button group" size={"small"} disableElevation>
                <Button
                    color={props.filter === 'all' ? "success" : "warning"}
                    sx={{mr: '2px'}}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    color={props.filter === 'active' ? "success" : "warning"}
                    sx={{mr: '2px'}}

                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    color={props.filter === 'completed' ? "success" : "warning"}

                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </ButtonGroup>
        </div>
    </div>
}
