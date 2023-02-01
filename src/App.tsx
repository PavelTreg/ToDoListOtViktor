import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [todoListId: string]: Array<TaskType>
}

function App() {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolist, setTodolist] = useState<Array<TodoListType>>([
        {id: todolistId1, title: 'What to lear', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])


    const [tasks, setTasks] = useState<TaskStateType>({
            [todolistId1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false}
            ],
            [todolistId2]: [
                {id: v1(), title: "Rom", isDone: true},
                {id: v1(), title: "Whiskey", isDone: true},
                {id: v1(), title: "Cola", isDone: false},
            ]
        }
    )



    function removeTask(id: string, todolistId: string) {
/*        const taskForUpdate = tasks[todolistId]
        const updateTasks = taskForUpdate.filter(t => t.id != id)
        const copyTasks = {...tasks}
        copyTasks[todolistId] = updateTasks
        setTasks(copyTasks)*/

        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== id)})
    }

    function addTask(title: string, todolistId: string) {
        let newTasks: TaskType = {id: v1(), title: title, isDone: false};
/*        const tasksForUpdate = tasks[todolistId]
        const updateTasks = [...tasksForUpdate, newTasks]
        const copyTasks = {...tasks}
        copyTasks[todolistId] = updateTasks
        setTasks(copyTasks)
        */
        setTasks({ ...tasks, [todolistId] : [...tasks[todolistId], newTasks]})
    }


    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        const tasksForUpdate = tasks[todolistId]
        const updateTasks = tasksForUpdate.map((t) => t.id === taskId ? {...t, isDone: isDone} : t)
       setTasks({...tasks, [todolistId]: updateTasks})



    }

    const getFilteredTasksForRender =
        (tasks: Array<TaskType>, filter: FilterValuesType):Array<TaskType>  => {
            switch (filter) {
                case "active":
                    return  tasks.filter(task => !task.isDone)
                case "completed":
                    return  tasks.filter(task => task.isDone)
                default:
                    return  tasks
            }
        }

    const changeTodolistFilter = (value: FilterValuesType, todolistId: string) => {
        setTodolist(todolist.map((tl) => tl.id === todolistId ? {...tl, filter: value} : tl))
    }

    const removeTodolist = (todolistId:string) => {
        const updateTodolist = todolist.filter(((t) => t.id !== todolistId))
        setTodolist(updateTodolist)
    }

    const todoListComponents = todolist.length
            ? todolist.map((tl) => {
      const tasksForTodolist = getFilteredTasksForRender(tasks[tl.id], tl.filter)

        return (
            <Todolist title={tl.title}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeTodolistFilter={changeTodolistFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={tl.filter}

                      removeTodolist = {removeTodolist}
                      todoListId = {tl.id}
            />

    );

    })
        : <span> Create </span>
    return   (
        <div className="App">
            {
                todoListComponents
            }
        </div>
    )

}

export default App;
