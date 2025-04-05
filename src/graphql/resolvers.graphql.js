const Post = require("../models/post.model");
const User = require("../models/user.model");
const Comment = require("../models/comment.model");

const resolvers = {
  Post: {
    user: async (post) => await User.findOne({ id: post.userId }),
  },
  Comment: {
    post: async (comment) => await Post.findOne({ id: comment.postId }),
  },

  Query: {
    getAllPosts: async () => await Post.find(),
    getAllUsers: async () => await User.find(),
    getAllComments: async () => await Comment.find(),
    getPost: async (parent, { id }) => await Post.findOne({ id }),
    getUser: async (parent, { id }) => await User.findOne({ id }),
    getComment: async (parent, { id }) => await Comment.findOne({ id }),
  },

  Mutation: {
    createPost: async (parent, { input }) => {
      const newPost = new Post(input);
      return await newPost.save();
    },
    updatePost: async (parent, { input }) => {
      const { id, ...updateFields } = input;
      return await Post.findOneAndUpdate({ id }, updateFields, { new: true });
    },
    deletePost: async (parent, { id }) => {
      const deletedPost = await Post.findOneAndDelete({ id });
      return !!deletedPost;
    },

    createUser: async (parent, { input }) => {
      const newUser = new User(input);
      return await newUser.save();
    },
    updateUser: async (parent, { input }) => {
      const { id, ...updateFields } = input;
      return await User.findOneAndUpdate({ id }, updateFields, { new: true });
    },
    deleteUser: async (parent, { id }) => {
      const deletedUser = await User.findOneAndDelete({ id });
      return !!deletedUser;
    },

    createComment: async (parent, { input }) => {
      const newComment = new Comment(input);
      return await newComment.save();
    },
    updateComment: async (parent, { input }) => {
      const { id, ...updateFields } = input;
      return await Comment.findOneAndUpdate({ id }, updateFields, {
        new: true,
      });
    },
    deleteComment: async (parent, { id }) => {
      const deletedComment = await Comment.findOneAndDelete({ id });
      return !!deletedComment;
    },
  },
};

module.exports = resolvers;
