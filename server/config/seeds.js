const db = require('./connection');
const { User, Post, Comment } = require('../models');

db.once('open', async () => 
{
    console.log("Seeding started");

    await User.deleteMany();

    let users=[];
    users.push(await User.create(
      {
        firstName: 'Alan',
        lastName: 'Moreno',
        userName: 'algmoreno',
        email: "alg.moreno00@gmail.com",
        password: "12345",
        posts: [
          {
            posts: [posts[0]._id, posts[1]._id]
          }
        ]
      }
    ));
    console.log('Users seeded');

    await Post.deleteMany();

    let post = await Post.create(
        {
            postText: 'This is the best food I have ever tasted',
            user: users[0]._id,
        });

    let user = await User.findOneAndUpdate(
        { _id: users[0]._id },
        { $push: { posts: post._id } },
        { new: true });

    post = await Post.create(
        {
            postText: 'this is a test post to see if everything works',
            user: users[0]._id,
        });

    user = await User.findOneAndUpdate(
        { _id: users[1]._id },
        { $push: { posts: post._id } },
        { new: true });
})