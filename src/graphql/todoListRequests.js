import { gql } from "@apollo/client";

const GET_TODOS_BY_USER = gql`
    query GetTodosByUser($id: ID!) {
        getTodosByUser(id: $id) {
            todos {
                title
                id
                userId
                status
                created_at
                updated_at
            }
        }
    }
`

const GET_TODOS_BY_STATUS = gql`
    query GetTodosByStatus($id: ID!, $status: String!) {
        getTodosByStatus(id: $id, status: $status) {
            todos {
                title
                id
                userId
                status
                created_at
                updated_at
            }
        }
    }
`

const ADD_TODO = gql`
    mutation AddTodo($input: AddTodoInput) {
        addTodo(input: $input) {
        id
        userId
        title
        status
        created_at
        updated_at
        }
    }
`

const REMOVE_TODO = gql`
    mutation RemoveTodo($input: RemoveTodoInput) {
        removeTodo(input: $input) 
    }
`

const CHANGE_TODO_STATUS = gql`
mutation ChangeTodoStatus($input: ChangeTodoStatusInput) {
    changeTodoStatus(input: $input) {
                id
                title
                status
                created_at
                userId
                updated_at
          }
}
`

export  {
    GET_TODOS_BY_USER,
    ADD_TODO,
    REMOVE_TODO,
    CHANGE_TODO_STATUS,
    GET_TODOS_BY_STATUS
}