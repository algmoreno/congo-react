const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema(
{
    user: 
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    post: 
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true
    },
    commentText: 
    {
      type: String,
      required: true
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment; 