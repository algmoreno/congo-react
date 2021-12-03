const db = require('./connection');
const { User, Post, Comment } = require('../models');

db.once('open', async () => {
  console.log("Seeding started");

  await User.deleteMany();

  let users = [];
  users.push(await User.create(
    {
      firstName: 'Alan',
      lastName: 'Moreno',
      userName: 'algmoreno',
      email: "alg.moreno00@gmail.com",
      password: "12345",
      posts: []
    }
  ));
  users.push(await User.create(
    {
      firstName: 'test',
      lastName: 'tester',
      userName: 'test tickles',
      email: "test@test.com",
      password: "12345",
      posts: []
    }
  ));
  console.log('Users seeded');

  // await Post.deleteMany();

  // let post = await Post.create(
  //   {
  //     postText: 'This is the best food I have ever tasted',
  //     user: users[0]._id,
  //   });

  // let user = await User.findOneAndUpdate(
  //   { _id: users[0]._id },
  //   { $push: { post: post._id } },
  //   { new: true });

  // post = await Post.create(
  //   {
  //     postText: 'this is a test post to see if everything works',
  //     user: users[0]._id,
  //   });

  // user = await User.findOneAndUpdate(
  //   { _id: user[0]._id },
  //   { $push: { post: post._id } },
  //   { new: true });

  // post = await Post.create(
  //   {
  //     postText: 'this is a second test post',
  //     user: users[0]._id,
  //   });

  // user = await User.findOneAndUpdate(
  //   { _id: users[0]._id },
  //   { $push: { post: post._id } },
  //   { new: true });

  // console.log('posts seeded')

  // let comment = await Comment.create(
  //   {
  //     commentText: 'nice post bro',
  //     user: users[1]._id,
  //     post: post[0]._id
  //   }
  // )

  // user = await User.findOneAndUpdate(
  //   { _id: users[1]._id },
  //   { $push: { comment: comment._id } },
  //   { new: true }
  // )

  // console.log('comments seeded')

  process.exit();
})