import {TodoListType} from "../App";

type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListId: string
}

type AppTodoListAT = {
    type: "ADD-TODOLIST"
    payload: {
        title: string
    }

}
export const todoListReducer = (todoLists: Array<TodoListType>, action: RemoveTodoListAT): Array<TodoListType> => {

    switch (action.type) {
        case 'REMOVE-TODOLIST':

        return todoLists.filter((t) => t.id !== action.todoListId)
        default:
            return todoLists



    }


    return todoLists
}