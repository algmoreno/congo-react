const { AuthenticationError } = require('apollo-server-express');
const { User, Post, Comment } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers =
{
  Query:
  {
    me: async (parent, args, context) => {
      console.log("me");
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate({ path: "posts", populate: "posts" })
          .populate({ path: "comments ", populate: "comments" })
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
  {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    removeUser: async (parent, { _id }) => {
      const user = await User.findOneAndDelete({ _id: _id }, { new: true })
        .populate("posts");
      return user;
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    editUser: async (parent, args) => {
      const user = await User.findOneAndUpdate({ _id: args._id }, { firstName: args.firstName, lastName: args.lastName, userName: args.userName, email: args.email }, { new: true });
      user.password = args.password;
      await user.save();
      const token = signToken(user);
      return { token, user };
    },
    addPost: async (parent, args) => {
      const post = await Post.create(args);

      await User.findOneAndUpdate(
        { _id: args.user },
        { $push: { posts: post._id } });

      return post;
    },
    editPost: async (parent, args) => {
      const post = await Post.findOneAndUpdate(args._id, args);
      return review;
    },
    removePost: async (parent, { _id }) => {
      const post = await Post.findOneAndRemove(_id);

      await User.findOneAndUpdate(
        { _id: post.user },
        { $pull: { posts: _id } });

      return post;
    },
    addComment: async (parent, args) => {
      const comment = await Comment.create(args);

      await User.findOneAndUpdate(
        { _id: args.user },
        { $push: { comments: comment._id } });

      await Post.findOneAndUpdate(
        { _id: args.post },
        { $push: { comments: comment._id } });

      return post;
    },
    editComment: async (parent, args) => {
      const comment = await Comment.findOneAndUpdate(args._id, args);
      return comment;
    },
    removeComment: async (parent, { _id }) => {
      const comment = await Comment.findOneAndRemove(_id);

      await User.findOneAndUpdate(
        { _id: comment.user },
        { $pull: { comments: _id } });

      await Post.findOneAndUpdate(
        { _id: comment.post },
        { $pull: { comments: _id } });

      return comment;
    }
  }
};

module.exports = resolvers; 