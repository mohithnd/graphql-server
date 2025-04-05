const graphqlSchema = `
type Post{
    id: ID!
    userId: ID!
    title: String!
    body: String!
    user: User
}

type User{
    id: ID!
    name: String!
    username: String!
    email: String!
    phone: String!
    website: String!
}

type Comment{
    id: ID!
    postId: ID!
    name: String!
    email: String!
    body: String!
    post: Post
}

input CreatePostInput {
    id: ID!
    userId: ID!
    title: String!
    body: String!
}

input UpdatePostInput {
    id: ID!
    title: String
    body: String
}

input CreateUserInput {
    id: ID!
    name: String!
    username: String!
    email: String!
    phone: String!
    website: String!
}

input UpdateUserInput {
    id: ID!
    name: String
    username: String
    email: String
    phone: String
    website: String
}

input CreateCommentInput {
    id: ID!
    postId: ID!
    name: String!
    email: String!
    body: String!
}

input UpdateCommentInput {
    id: ID!
    postId: ID
    name: String
    email: String
    body: String
}

type Mutation {
    createPost(input: CreatePostInput): Post
    updatePost(input: UpdatePostInput): Post
    deletePost(id: ID!): Boolean

    createUser(input: CreateUserInput): User
    updateUser(input: UpdateUserInput): User
    deleteUser(id: ID!): Boolean

    createComment(input: CreateCommentInput): Comment
    updateComment(input: UpdateCommentInput): Comment
    deleteComment(id: ID!): Boolean
}

type Query{
    getAllPosts: [Post]
    getAllUsers: [User]
    getAllComments: [Comment]
    getPost(id: ID!): Post
    getUser(id: ID!): User
    getComment(id: ID!): Comment
}
`;

module.exports = graphqlSchema;
