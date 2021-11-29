const { AuthenticationError } = require('apollo-server-express');
const { Review } = require('../../../pet-shop/server/models');
const { User, Post, Comment } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = 
{
    Query:
    {
        me: async (parent, args, context) => {
          console.log("me");
          if (context.user) {
            const userData = await User.findOne({ _id: context.user._id })
              .select('-__v -password')
              .populate({ path: "posts", populate: "posts"})
              .populate({ path: "comments ", populate: "comments"})
            return userData;
          }

          throw new AuthenticationError('Not logged in');
        },
        user: async () => {
          return await User.find().populate({ path: "posts", populate: "posts" })
        },
        user: async () => {
          return await User.findById(_id).populate({ path: "posts", populate: "posts " })
        },
        posts: async (parent, { user }) => {
          const params = {};
          if (user)
            params.user = user; 
          else if (product) 
            params.product = product;
          return await Post.find(params).populate("user")
        },
        post: async (parent, { _id }) => {
          return await Post.findById(_id).populate("user")
        },
        comment: async (parent, { _id }) => {
          return await Comment.findById(_id).populate("post")
        }
    },
    
    Mutation: 
}