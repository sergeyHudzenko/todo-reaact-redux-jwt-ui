import React, { useState } from "react";
import { useMutation } from '@apollo/client';
//Redux
import { useDispatch } from "react-redux";
import { CREATE_USER, LOGIN } from "../graphql/userRequests";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
    useNavigate,
} from 'react-router-dom';
import { setUserAuthInfo } from "../redux/appSlice";

const SignUserForm = ({signInMode = false, signUpMode = false}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const [createUser] = useMutation(CREATE_USER, { variables: {input: {
    email,
    password,
    name
  }}});

  const [login, loginData] = useMutation(LOGIN, { variables: {input: {
    email,
    password
  }}});


  const onSubmit = (event) => {
    event.preventDefault();
    if (name && password && email && signUpMode) {
      createUser().then(() => {
        setName("")
        setEmail("")
        setPassword("")
        navigate('/sing-in');
      })
    } else if (password && email && signInMode) {
        login()
        console.log(loginData.data)
        // dispatch(setUserAuthInfo(loginData.data.login))÷
    } else {
        alert("Not all fildes was filled")
    }
  };

  return (
    <form onSubmit={onSubmit}>
    {signUpMode && (
            <TextField 
            width={100+"%"} 
            className="todo-input" 
            id="name-field" 
            variant="standard" 
            placeholder="Your name" 
            value={name} 
            required={true}
            onChange={(event) => setName(event.target.value)}
            /> 
    )}
    <TextField 
        type="email"
        width={100+"%"} 
        className="todo-input" 
        id="email-field" 
        variant="standard" 
        placeholder="Your email" 
        value={email} 
        required={true}
        onChange={(event) => setEmail(event.target.value)}
        /> 

    <TextField 
        type="password"
        width={100+"%"} 
        className="todo-input" 
        id="pwd-field" 
        variant="standard" 
        placeholder="Create a password" 
        value={password} 
        required={true}
        onChange={(event) => setPassword(event.target.value)}
        /> 

    <Button className="sign-btn" variant="contained" type="submit">{signUpMode ?  "Sign up" : "Sign in"}</Button>
    </form>
  );
};

export default SignUserForm;
