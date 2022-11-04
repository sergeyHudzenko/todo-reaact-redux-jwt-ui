import { createSlice } from "@reduxjs/toolkit";

export const todoViewType = {
    ALL: "all",
    COMPLETED: "completed",
    INCOMPLETED: "incompleted"
}

export const appSlice = createSlice({
  name: "app",
  initialState: {
    todoViewType: todoViewType.ALL
  },
  reducers: {
    switchTodoViewType: (state, action) => {
        let type;

        switch (action.payload.type) {
            case todoViewType.COMPLETED: 
                type = todoViewType.COMPLETED
                break
            case todoViewType.INCOMPLETED: 
                type = todoViewType.INCOMPLETED
                break
            default:
                type = todoViewType.ALL
                break
        }

        state.todoViewType = type
    }
  }
});

export const { switchTodoViewType } = appSlice.actions;

export default appSlice.reducer;
