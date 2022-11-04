import React, { useEffect, useState } from "react";
import AddTodoForm from "./components/TodoComponents/AddTodoForm";
import SignUserForm from "./components/AuthComponents/SignUserForm";
import TodoList from "./components/TodoComponents/TodoList";
import Header  from "./components/Header";
import Footer from "./components/Footer";

import { useSelector } from "react-redux";
import { useQuery } from '@apollo/client';
import { GET_TODOS_BY_USER, GET_TODOS_BY_STATUS } from './graphql/todoListRequests';

import { uploadTodo } from "./redux/todoSlice";
import { useDispatch } from "react-redux";
import logo from "./assets/group.svg"
import Token from "./utils/token";

const App = ({signInMode = false, signUpMode = false}) => {
  const appStore = useSelector((state) => state.app);
  const [ todos, setTodos ] = useState([])
  const dispatch = useDispatch()
  
  const todosQuery = appStore.todoViewType === "all" ? GET_TODOS_BY_USER : GET_TODOS_BY_STATUS
  const status = appStore.todoViewType === "all" ? undefined : appStore.todoViewType

  const {loading, data} = useQuery(todosQuery, {
    variables: {
      id: Token.getUser(),
      status
    }
  });

  useEffect(() => {
    if (!loading && data) {
      setTodos(appStore.todoViewType === "all" ? data.getTodosByUser.todos : data.getTodosByStatus.todos)
      dispatch(uploadTodo({ data: todos }))
    }
  }, [data, appStore.todoViewType, dispatch, loading, todos])

  return (
    <>
      <Header />
      <main>
        <section className="todo-section">
          <img className="logo" src={logo} alt="logo" />
          
          {(signUpMode || signInMode) ? (
            <>
            <h3>Todo List</h3>
            <SignUserForm signInMode={signInMode} signUpMode={signUpMode}  />
            </>
          ) : (
            <>
              <h3>Todo List</h3>
              <AddTodoForm />
              <TodoList />
              <Footer />
            </>
          )}
        </section>
      </main>
      <footer></footer>
    </>
  );
};

export default App;
