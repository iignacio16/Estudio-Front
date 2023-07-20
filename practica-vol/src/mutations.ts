import { gql } from "@apollo/client";

export const CREATE_USER = gql`
    mutation CreateUser($input: CreateUserInput!){
        createUser(input: $input){
            id
            name
            email
            createdAt
            updatedAt
        }
    }
`;

export const CREATE_POST = gql`
    mutation CreatePost($input: CreatePostInput!){
        createPost(input: $input){
            id
            title
            body
            imageUrl
        }
    }
`;

export const CREATE_COMMENT = gql`
mutation createComment($input: CreateCommentInput!){
  createComment(input: $input){
    id
    body
    createdAt
    updatedAt
    user{
      name
      email
    }
  }
}
`;
