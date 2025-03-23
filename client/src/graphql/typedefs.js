"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = (0, apollo_server_express_1.gql) `
  type User {
    _id: ID!
    username: String!
    email: String!
    thoughts: [Thought]
  }

  type Thought {
    _id: ID!
    thoughtText: String!
    createdAt: String!
    username: String!
  }

  type Query {
    users: [User]
    user(id: ID!): User
    thoughts: [Thought]
    thought(id: ID!): Thought
  }

  type Mutation {
    addUser(username: String!, email: String!): User
    addThought(thoughtText: String!, username: String!): Thought
    deleteUser(id: ID!): String
  }
`;
exports.default = typeDefs;
