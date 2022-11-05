const userTypeDefs = `#graphql
    scalar Date
    type User{
        id: ID
        name: String
        gender: String
        phone: String
        email: String
        address: String
        nationality: String
        dateOfBirth: Date
        educationBackground: String
        modeOfContact: String
    }
    enum Gender {
        male
        female
    }
    enum Contact {
        email
        phone
        none
    }
    input UserInput{
        name: String!
        gender: Gender!
        phone: String!
        email: String!
        address: String!
        nationality: String!
        dateOfBirth: Date!
        educationBackground: String!
        modeOfContact: Contact
    }
    type GetUsers {
        users: [User]
        totalUsers: Int
        limit: Int
    }
    type Query {
        getUser(id: ID!): User
        getUsers(page: Int!): GetUsers
    }
    type Mutation {
        createUser(userInput: UserInput!): User
    }
`;
export default userTypeDefs;
