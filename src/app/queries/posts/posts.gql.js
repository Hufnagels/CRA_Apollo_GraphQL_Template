import {
  gql
} from "@apollo/client";

// QUERIES
export const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      posts {
        _id
        author
        title
        subtitle
        description
        titleimage
      }
    }
  }
`
export const GET_POST = gql`
  query GetPost($id: ID!) {
    getPost(_id: $id) {
      author
      title
      subtitle
      description
      titleimage
    }
  }
`

// MUTATIONS
export const CREATE_POST = gql`
  mutation CreatePost($input: PostInputCreate) {
    createPost(input: $input) {
      author
      title
      subtitle
      description
      titleimage
    }
  }
`;
