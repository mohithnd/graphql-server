const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
const connectToDB = require("./config/db.config");
const graphqlSchema = require("./graphql/schema.graphql");
const resolvers = require("./graphql/resolvers.graphql");

const PORT = 3000;

async function startServer() {
  connectToDB();

  const app = express();

  app.use(express.json());
  app.use(express.text());
  app.use(express.urlencoded({ extended: true }));

  app.use(cors());

  const server = new ApolloServer({
    typeDefs: graphqlSchema,
    resolvers: resolvers,
  });

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(PORT, () => {
    console.log(`Server Is Running On http://localhost:${PORT}/graphql`);
  });
}

startServer();
