import {
  gql
} from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers($search: String, $limit: Int) {
    getUsers(search: $search, limit: $limit) {
      users {
        username
        first_name
        family_name
        email
        _id
        updatedAt
      }
    }
  }
`;

export const GET_MAPS = gql`
  query GetMaps($search: String) {
  getMaps(search: $search) {
    maps {
      _id
      title
      description
      originalMap
      currentMap
      mapimage
      editinghistory {
        editedMap
        updated
      }
    }
  }
}
`;

export const ADD_POST = gql`
  mutation CreatePost($post: PostInput) {
    createPost(post: $post) {
      _id
      author
      title
      description
    }
  }
`;

export const EDIT_USER = gql`
  mutation($id: Int, $name: String, $email: String, $job_title: String) {
    updateUserInfo (id: $id, name: $name, email: $email, job_title: $job_title)
  }
`;

export const DELETE_USER = gql`
  mutation($id: Int) {
    deleteUser(id: $id)
  }
`
