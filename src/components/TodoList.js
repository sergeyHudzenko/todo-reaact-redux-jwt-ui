import React from "react";
//Redux
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";

const TodoList = () => {
  const todosStore = useSelector((state) => state.todos);
  
  return (
    <ul className="todo-list">
      {todosStore && todosStore.todos  ? todosStore.todos.map((todo, id) => (
        <TodoItem
          key={id}
          id={todo.id}
          title={todo.title}
          status={todo.status}
        />
      )) : (<></>)}
    </ul>
  );
};

export default TodoList;
