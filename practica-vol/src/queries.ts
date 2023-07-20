import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query getPosts($limit:Int $page: Int){
  posts(limit: $limit, page: $page){
    id
    title
    body
    imageUrl
    createdAt
    updatedAt
    comments{
      body
      user{
        id
        email
      }
      replies{
        body
      }
    }
  }
}
`;

export const GET_POST_ID = gql`
 query getPost($id: ID!){
 post(id: $id){
    id
    title
    body
    imageUrl
    comments{
      id
      body
      user{
        name
        email
      }
    }
  }
}
`;
