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

// QUERIES
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

// MUTATIONS
export const ADD_USER = gql`
  mutation CreateUser($user: UserInputAdd) {
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
  mutation($id: String, $firstName: String, $firstName: String, $email: String, $date_of_birth: String) {
    updateUserInfo (id: $id, firstName: $firstName, lastName: $lastName, email: $email, date_of_birth: $date_of_birth)
  }
`;

export const DELETE_USER = gql`
  mutation($id: String) {
    deleteUser(id: $id)
  }
`
