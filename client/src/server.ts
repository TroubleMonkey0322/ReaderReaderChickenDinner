import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import typeDefs from './graphql/typedefs';
import resolvers from './graphql/resolvers';

dotenv.config();

const startServer = async () => {
  const app = express();

  
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  //server.applyMiddleware({ app });

  
  mongoose.connect(process.env.MONGO_URI as string, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
      });

  app.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  });
};

startServer();
