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
        description
        titleimage
      }
    }
  }
`

// MUTATIONS
export const ADD_POST = gql`
  mutation CreatePost($input: PostInput) {
    createPost(input: $input) {
      author
      title
      description
      titleimage
    }
  }
`;
