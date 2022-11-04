import React, { useState } from "react";
import { useMutation } from '@apollo/client';
//Redux
import { useDispatch } from "react-redux";
import { ADD_TODO } from "../../graphql/todoListRequests";
import { addTodo } from "../../redux/todoSlice";
import TextField from "@mui/material/TextField";
import Token from "../../utils/token";

const AddTodoForm = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
 
  const [addingTodo] = useMutation(ADD_TODO, { variables: {input: {
    userId: Token.getUser(),
    title: value
  }}});

  const onKeyDown = (event) => {
    // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      onSubmit(event);
    }
  }
  const onSubmit = (event) => {
    event.preventDefault();
    if (value) {
      addingTodo()
      dispatch(addTodo({ title: value }))
      setValue("")
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <TextField 
        width={100+"%"} 
        className="todo-input" 
        id="standard-basic" 
        variant="standard" 
        placeholder="Add a new todo" 
        value={value} 
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={onKeyDown}
        
        /> 
    </form>
  );
};

export default AddTodoForm;
