import React, { useEffect, useState } from "react";
import AddTodoForm from "./components/AddTodoForm";
import SignUserForm from "./components/SignUserForm";
import TodoList from "./components/TodoList";
import Header  from "./components/Header";
import Footer from "./components/Footer";

import { useSelector } from "react-redux";
import { useQuery } from '@apollo/client';
import { GET_TODOS_BY_USER, GET_TODOS_BY_STATUS } from './graphql/todoListRequests';

import { uploadTodo } from "./redux/todoSlice";
import { useDispatch } from "react-redux";
import logo from "./assets/group.svg"
import { isAuthenticated } from "./utils/auth";

const App = ({signInMode = false, signUpMode = false}) => {
  const appStore = useSelector((state) => state.app);
  const [ todos, setTodos ] = useState([])
  const [auth, setAuth] = useState(false)
  const dispatch = useDispatch()
  const accessToken = appStore.userAuth.token;

  useEffect(() => {
    setAuth(isAuthenticated(accessToken))
  })

  const todosQuery = appStore.todoViewType === "all" ? GET_TODOS_BY_USER : GET_TODOS_BY_STATUS
  const status = appStore.todoViewType === "all" ? undefined : appStore.todoViewType

  const {loading, data} = useQuery(todosQuery, {
    variables: {
      id: 5,
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
          <img className="logo" src={logo} />
          
          {(signUpMode || signInMode) ? (
            <>
            <h3>Todo List</h3>
            <SignUserForm signInMode={signInMode} signUpMode={signUpMode}  />
            </>
          ) : (
            <>
              {auth ? (<h3>You need to be authentificated</h3>) : (
                <>
                <h3>Todo List</h3>
                <AddTodoForm />
                <TodoList />
                <Footer />
                </>
              ) }
              
            </>
          )}
        </section>
      </main>
      <footer></footer>
    </>
  );
};

export default App;
