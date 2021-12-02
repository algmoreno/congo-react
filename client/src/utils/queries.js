import { gql } from '@apollo/client';

export const QUERY_ALL_USERS = gql`
  query users
  {
      users
      {
        _id
        firstName
        lastName
        userName
        email
        posts
        {
          _id
          postText
        }
        comments
        {
          _id
          commentText
        }
      }
  }
`;

export const QUERY_USER = gql `
    query user($userId: ID!) 
    {
        user(_id: $userId)
        {
          _id
          firstName
          lastName
          email
          posts
          {
            _id
            user
            postText
            comments
          }
          comments
          {
            _id
            user
            post
            commentText
          }
        }
    }
`;

export const QUERY_ALL_POSTS = gql`
    query posts
    {
      posts
      {
        _id
        user
        postText
        comments 
        {
          _id
          user
          post
          commentText
        }
      }
    }
`
