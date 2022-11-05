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
import { PrismaClient } from "@prisma/client";
import { GraphQLContext } from "./util/types";

async function startApolloServer() {
  dotenv.config();
  const PORT = process.env.PORT || 5000;
  const prisma = new PrismaClient();
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async (): Promise<GraphQLContext> => {
      return {
        prisma,
      };
    },
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
  await server.start();
  server.applyMiddleware({ app, cors: corsOptions });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
}

startApolloServer().catch((err: any) => {
  console.log(err?.message);
});
