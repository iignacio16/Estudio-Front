export type User =  {
    id: string
    name: string
    email: string
    createdAt: string
    updatedAt: string
  }
  
 export type Post = {
    id: string
    title: string
    body: string
    imageUrl: string
    createdAt: string
    updatedAt: string
    comments: Comment[]
  }
  
  export type Comment = {
    id: string
    body: string
    createdAt: string
    updatedAt: string
    user: User
    replies: Comment[]
  }

  export type GetPostsQuery = {
    posts: Post[]
  }

  export type GetPost = {
    post: Post
  }