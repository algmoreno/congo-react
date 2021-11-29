const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User
  {
    _id: ID
    firstName: String
    lastName: String
    userName: String
    email: String
    posts: [Post]
    comments: [Comment]
  }

  type Post
  {
    _id: ID
    postText: String
    user: User
    comment: Comment
  }
  
  type Comment 
  {
    _id: ID
    commentText: String
    post: Post
    user: User
  }

  type Auth 
  {
    token: ID!
    user: User
  }

  type Query 
  {
    me: User
    users: [User]
    user(_id: ID!): User
    posts(user: ID): [Post]
    post(_id: ID!): Post
    comments(user: ID, post: ID): [Comment]
    comment(_id: ID!): Comment
  }

  type Mutation 
  {
    login(email: String!, password: String!): Auth
    addUser(firstName: String!, lastName: String!, userName: String!, email: String!, password: String!): Auth
    editUser(_id: ID!, firstName: String, lastName: String, userName: String, email: String, password: String): Auth
    removeUser(_id: ID!): User
    addPost(postText: String!, user: ID!): Post
    editPost(_id: ID!, postText: String): Post
    removePost(_id: ID!): Post
    addComment(commentText: String!, user: ID!, post: ID!): Comment
    editComment(_id: ID!, commentText: String): Comment
    removeComment(_id: ID!): Comment
  }
`;

module.exports = typeDefs; 