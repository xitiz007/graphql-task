import { PrismaClient, MODE_OF_CONTACT, GENDER } from "@prisma/client";

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
  dateOfBirth: Date;
  educationBackground: string;
  modeOfContact: MODE_OF_CONTACT;
}
