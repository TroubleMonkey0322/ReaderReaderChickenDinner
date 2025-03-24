import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    thoughts: [Thought]
    bookCount: String!
    savedBooks: [Book!]!
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

  type Book {
  BookId: String!
  title: String!
  authors: [String!]!
  description: String!
  image: String
  link: String
  }

  type Auth {
  token: String!
  user: User!
  }

  type Mutation {
  login(email: String!, password: String!): Auth!
    addUser(username: String!, email: String!): User
    saveBook(bookId: String!, title: String!, authors: [String!]!, descritption: String, image: String, link:String): User!
    removeBook(bookId: String!): User!
    addThought(thoughtText: String!, username: String!): Thought
    deleteUser(id: ID!): String
  }
`;

export default typeDefs;
