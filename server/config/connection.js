const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.z4nxt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`);

module.exports = mongoose.connection;
