import { gql } from "@apollo/client";

const LOGIN = gql`
    mutation Login($input: UserInputForLogin) {
        login(input: $input) {
            token
            userId
        }
    }
`

const CREATE_USER = gql`
mutation CreateUser($input: UserInputForAdding) {
    addUser(input: $input) {
            id
            name
            email
            created_at
          }
}
`

export  {
    LOGIN,
    CREATE_USER
}