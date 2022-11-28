import React, {useState} from 'react';
import {FilterValueType, TaskType} from "./App";

type ToDoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeTodoListFilter: (nextFilterValue:FilterValueType) => void
    addTask: (title:string) => void
}

const ToDoList = (props: ToDoListPropsType) => {
const [title,setTitle] = useState<string>('')
    const tasksListItems = props.tasks.map((task) => {
        return (
            <li key={task.id}><input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}>x</button>
            </li>
        )
    })
  const addTask = ()=> {{props.addTask(title)
      setTitle('')
  }

  }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onKeyDown={(e) => {
                        if(e.key === 'Enter') {
                            props.addTask(title)
                                setTitle('')
                        }

                    }}
                    onChange={(e) => setTitle(e.currentTarget.value)}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {tasksListItems}
            </ul>
            <div>
                <button onClick={() => props.changeTodoListFilter('all')}>All</button>
                <button onClick={() => props.changeTodoListFilter('active')}>Active</button>
                <button onClick={() => props.changeTodoListFilter('completed')}>Completed</button>
            </div>
        </div>
    );
};

export default ToDoList;