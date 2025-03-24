import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Create an Apollo Client instance with an HTTP link to your GraphQL API
const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/graphql' }), // Replace with your Apollo Server URI
  cache: new InMemoryCache(),
});

export default client;


import { gql } from '@apollo/client';

// Define the GET_ME query to get the current authenticated user's information
export const GET_ME = gql`
  query GetMe {
    me {
      _id
      username
      email
      savedBooks {
        bookId
        title
        authors
        description
        image
        link
      }
    }
  }
`;
