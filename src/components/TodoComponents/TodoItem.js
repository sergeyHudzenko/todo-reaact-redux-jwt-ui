import React, { useEffect } from "react";
import { useState } from "react";
import { useMutation } from '@apollo/client';
import Checkbox from '@mui/material/Checkbox';
import CloseIcon from '@mui/icons-material/Close'
import Grid from "@mui/material/Grid";
//Redux
import { useDispatch } from "react-redux";
import { deleteItem, markComplete } from "../../redux/todoSlice";
import { CHANGE_TODO_STATUS, REMOVE_TODO } from "../../graphql/todoListRequests";

const TodoItem = ({ id, title, status }) => {
  const dispatch = useDispatch();
  const [isActive, setActive] = useState(status === "completed");
  const [removeTodo] = useMutation(REMOVE_TODO, { variables: {input: {
    id: id
  }}});

  const [changeTodoStatus] = useMutation(CHANGE_TODO_STATUS, { variables: {input: {
    id: id,
    status: isActive ? "incompleted" : "completed"
  }}});

  const markCompleteds = () => {
    setActive(!isActive);
    dispatch(markComplete({ id, status:  isActive ? "incompleted" : "completed"}));
    changeTodoStatus()
  };
  const deleteAction = () => {
    removeTodo();
    dispatch(deleteItem({ id }));
    setActive(false)
  };

  useEffect(() => {
    setActive(status === "completed")
  }, [status])
  return (
        <li className="todo-item status">
         <Grid container width={100+"%"} direction="row"
                  justifyContent="center"
                  alignItems="center"
                  >
                <Grid item xs={2}>
                  <Checkbox  
                    key={id}
                     checked={isActive}
                    onClick={() => {
                      markCompleteds();
                    }} />
                </Grid>
                <Grid item xs={9}>
                 <p>{title}</p>
                </Grid>
                <Grid item xs={1}>
                  <section>
                  <CloseIcon className="close-icon"  onClick={() => {
                      deleteAction();
                    }}/>
                </section>
                </Grid>
          </Grid>
        </li>
  );
};

export default TodoItem;
