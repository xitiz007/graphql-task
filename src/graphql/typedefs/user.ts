const userTypeDefs = `#graphql
    scalar Date
    type User{
        _id: ID
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
    type Query {
        getUser(id: ID!): User
    }
`;
export default userTypeDefs;
