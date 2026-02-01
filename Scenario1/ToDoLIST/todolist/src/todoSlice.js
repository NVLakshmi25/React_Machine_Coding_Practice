import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.list.push(action.payload);
    },

    deleteTodo: (state, action) => {
      state.list = state.list.filter(
        (t) => t.id !== action.payload
      );
    },

    editTodo: (state, action) => {
      const todo = state.list.find(
        (t) => t.id === action.payload.id
      );
      if (todo) {
        todo.text = action.payload.text;
      }
    },
  },
});

export const { addTodo, deleteTodo, editTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
