import { createSlice } from "@reduxjs/toolkit";
//Random ID
import { v4 as uuid } from "uuid";

export const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: []
  },
  reducers: {
    uploadTodo: (state, action) => {
      const todosMap =  action.payload.data.map(todo => ({
        id: todo.id,
        title: todo.title,
        status: todo.status
      }))

      state.todos = todosMap
    },
    addTodo: (state, action) => {
      const todo = {
        id: uuid(),
        title: action.payload.title,
        status: "incomleted",
      };
      state.todos.push(todo);
    },
    markComplete: (state, action) => {
      const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
      state.todos[index].status = action.payload.status;
    },
    deleteItem: (state, action) => {
       state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
  },
});

export const { addTodo, markComplete, deleteItem, uploadTodo } = todoSlice.actions;

export default todoSlice.reducer;
