const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Post = require('./Post');
const Comment = require('./Comment');

const userSchema = new Schema(
  {
    firstName:
    {
      type: String,
      required: true,
      trim: true
    },
    lastName:
    {
      type: String,
      required: true,
      trim: true
    },
    userName:
    {
      type: String,
      required: true,
      trim: true
    },
    email:
    {
      type: String,
      required: true,
      unique: true
    },
    password: 
    {
      type: String,
      required: true,
      minlength: 5
    },
    posts: [Post.schema],
    comments: [Comment.schema]
});

userSchema.methods.isCorrectPassword = async function (password) 
{
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;