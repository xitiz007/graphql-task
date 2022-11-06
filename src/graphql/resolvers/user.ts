import {
  GraphQLContext,
  CreateUserInput,
  GetUsersData,
} from "../../utils/types";
import { User } from "@prisma/client";
import { UserInputError } from "apollo-server-core";
import validateCreateUser from "../../validation/formValidation";

const userResolvers = {
  Query: {
    getUser: async (
      _: any,
      args: { id: string },
      context: GraphQLContext
    ): Promise<User> => {
      try {
        const { id } = args;
        const { prisma } = context;
        const user = await prisma.user.findUnique({
          where: {
            id,
          },
        });
        if (!user) throw new Error("user not found");
        return user;
      } catch (err: any) {
        throw new Error(err?.message);
      }
    },
    getUsers: async (
      _: any,
      args: { page: number },
      context: GraphQLContext
    ): Promise<GetUsersData> => {
      try {
        const { prisma } = context;
        // offset pagination
        const page = args.page === 0 ? 1 : args.page;
        const take = 2;
        const skip = (page - 1) * take;
        const totalUsers = await prisma.user.count();
        const users = await prisma.user.findMany({
          skip,
          take,
        });
        return {
          limit: take,
          totalUsers,
          users,
        };
      } catch (err: any) {
        throw new Error(err?.message);
      }
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      args: { userInput: CreateUserInput },
      context: GraphQLContext
    ): Promise<User> => {
      const { userInput } = args;
      const { prisma } = context;
      // form validation
      const errors = validateCreateUser(userInput);
      if (errors.length)
        throw new UserInputError("form validation error", {
          validationErrors: errors,
        });
      try {
        const newUser = await prisma.user.create({
          data: {
            ...userInput,
            email: userInput.email.toLowerCase(),
          },
        });
        return newUser;
      } catch (err: any) {
        console.log();
        throw new Error(err?.message);
      }
    },
  },
};

export default userResolvers;
