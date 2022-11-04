import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import express from "express";
import http from "http";
import dotenv from "dotenv";
import corsOptions from "./config/corsOptions";
import typeDefs from "./graphql/typedefs";
import resolvers from "./graphql/resolvers";
import mongoose from "mongoose";
import connectDB from "./config/dbConnection";

async function startApolloServer() {
  dotenv.config();
  connectDB();
  const PORT = process.env.PORT || 5000;
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
  await server.start();
  server.applyMiddleware({ app, cors: corsOptions });
  mongoose.connection.once("open", () => {
    console.log("MongoDB connected");
    httpServer.listen({ port: PORT }, () => {
      console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
  mongoose.connection.on("error", (err: any) => {
    console.log(err?.message);
  });
}

startApolloServer().catch((err: any) => {
  console.log(err?.message);
});
