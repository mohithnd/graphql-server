const mongoose = require("mongoose");
const axios = require("axios");
const Post = require("../models/post.model");
const User = require("../models/user.model");
const Comment = require("../models/comment.model");
const connectToDB = require("../config/db.config");
const { PLACE_HOLDER_URL } = require("../config/server.config");

const BASE_URL = PLACE_HOLDER_URL;

async function seedDatabase() {
  try {
    await connectToDB();

    // Clear existing data
    await Post.deleteMany({});
    await User.deleteMany({});
    await Comment.deleteMany({});

    console.log("Database cleared.");

    // Fetch and insert users
    const usersResponse = await axios.get(`${BASE_URL}/users`);
    const users = usersResponse.data;
    await User.insertMany(users.slice(0, 50));
    console.log("Users seeded.");

    // Fetch and insert posts
    const postsResponse = await axios.get(`${BASE_URL}/posts`);
    const posts = postsResponse.data;
    await Post.insertMany(posts.slice(0, 50));
    console.log("Posts seeded.");

    // Fetch and insert comments
    const commentsResponse = await axios.get(`${BASE_URL}/comments`);
    const comments = commentsResponse.data;
    await Comment.insertMany(comments.slice(0, 50));
    console.log("Comments seeded.");

    console.log("Database seeding complete.");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
