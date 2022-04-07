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
export const CREATE_USER = gql`
  mutation CreateUser($input: UserInputCreate!) {
    createUser(input: $input) {
      user {
        _id
        username
        email
      }
      userErrors {
        message
        path
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation($id: String, $firstName: String, $firstName: String, $email: String, $date_of_birth: String) {
    updateUserInfo (id: $id, firstName: $firstName, lastName: $lastName, email: $email, date_of_birth: $date_of_birth)
  }
`;

export const DELETE_USER = gql`
  mutation($id: String) {
    deleteUser(id: $id)
  }
`
