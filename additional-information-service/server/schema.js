const { makeExecutableSchema } = require("graphql-tools");
const resolvers = require("./resolvers.js");

const typeDefs = `
  type Home {
    id: Int
    address: String
    city: String
    beds: Float
    baths: Float
    sqFt: String
    status: String
    taxAssessment: String
  }

  type Query {
    allHouses: [Home]
    getSome(num: [Int]!): [Home]
  }

  input UserInput {
    id: Int
    address: String
    city: String
    beds: Float
    baths: Float
    sqFt: String
    status: String
    taxAssessment: String
  }
  
  type Mutation {
    deleteHouse(id: Int!): Home
    updateHouse(input: UserInput!): Home
    createHouse(input: UserInput!): Home
  }
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

module.exports = schema;
