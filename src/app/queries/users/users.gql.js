import {
  gql
} from "@apollo/client";

// QUERIES
export const GET_USERS = gql`
  query GetUsers($search: String, $page: Int, $limit: Int) {
    getUsers(search: $search, page: $page, limit: $limit) {
      users {
        _id
        username
        firstName
        lastName
        email
        updatedAt
        createdAt
      }
      currentPage
      totalPages
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(_id: $id) {
      _id
      username
      firstName
      lastName
      email
      # ... on UserNotFoundError {
      #   message
      # }
      # ... on User {
      #   _id
      #   username
      #   firstName
      #   lastName
      #   email
      # }
    }
  }
`

// MUTATIONS
export const ADD_USER = gql`
  mutation CreateUser($input: UserInputAdd) {
    createUser(input: $input) {
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
