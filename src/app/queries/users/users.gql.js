import {
  gql
} from "@apollo/client";
/*
query GetUsers($search: String, $limit: Int) {
    getUsers(search: $search, limit: $limit) {
      users {
        username
        firstName
        lastName
        email
        _id
        updatedAt
      }
    }
  }
*/
export const GET_USERS = gql`
  query GetUsers($search: String, $limit: Int) {
    getUsers(search: $search, limit: $limit) {
      users {
        username
        firstName
        lastName
        email
        _id
        updatedAt
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation CreateUser($user: UserInput) {
    createUser(user: $user) {
      username
      firstName
      lastName
      date_of_birth
      email
      password
    }
  }
`;

export const EDIT_USER = gql`
  mutation($id: Int, $firstName: String, $firstName: String, $email: String, $date_of_birth: String) {
    updateUserInfo (id: $id, firstName: $firstName, lastName: $lastName, email: $email, date_of_birth: $date_of_birth)
  }
`;

export const DELETE_USER = gql`
  mutation($id: Int) {
    deleteUser(id: $id)
  }
`
