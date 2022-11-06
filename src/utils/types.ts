import { PrismaClient, MODE_OF_CONTACT, GENDER, User } from "@prisma/client";

// server
export interface GraphQLContext {
  prisma: PrismaClient;
}

// typedefs
export interface CreateUserInput {
  name: string;
  gender: GENDER;
  phone: string;
  email: string;
  address: string;
  nationality: string;
  dateOfBirth: string;
  educationBackground: string;
  modeOfContact: MODE_OF_CONTACT;
}

// resolvers
export interface GetUsersData {
  users: User[];
  totalUsers: number;
  limit: number;
}
