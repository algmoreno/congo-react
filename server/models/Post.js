const mongoose = require('mongoose');
const { Schema } = mongoose; 
const Comment = require('./Comment');

const postSchema = new Schema(
{
    user:
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    postText:
    {
      type: String,
      required: true
    },
    comments: [Comment.schema]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post; 