import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    todos: [],
}

const todoSlice = createSlice({
    name:'todo',
    initialState,
    reducers:{
        addTodo : (state , action) => {
            state.todos.push(action.payload);
        },
        deleteTodo : (state , action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
        },
        completeTodo : (state , action) => {
            const todo = state.todos.find((todo) => todo.id === action.payload.id);
            todo.status = "complete";
        },
        unmarkTodo : (state , action) => {
            const todo = state.todos.find((todo) => todo.id === action.payload.id);
            todo.status = "added";
        }
    }
})

export const { addTodo,deleteTodo,completeTodo,unmarkTodo } = todoSlice.actions;

export default todoSlice.reducer;