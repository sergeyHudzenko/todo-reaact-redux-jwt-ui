import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import appReducer from "./appSlice";

export default configureStore({
  reducer: {
    todos: todoReducer,
    app: appReducer
  },
});
