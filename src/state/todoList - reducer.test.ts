import {TodoListType} from "../App";
import {v1} from "uuid";
import {todoListReducer} from "./todoList - reducer";

test('correct todolist should be removed', () => {
    //тестовые данные
    let todolistId1 = v1();
    let todolistId2 = v1();
    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    //выполнение тестируемого кода

    let action;
    const endState = todoListReducer(startState, {type: 'REMOVE-TODOLIST', todoListId: todolistId1})
    //сверка результата с ожидаемым
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});