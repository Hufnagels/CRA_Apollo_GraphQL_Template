import {
  gql
} from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      posts {
        author
        title
        description
        _id
      }
    }
  }
`
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
