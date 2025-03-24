import './App.css';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { getCurrentUser } from './queries'; // Import the function to get the current user

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Error fetching user data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!user) return <div>No user data available</div>;

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <p>Email: {user.email}</p>
      <h2>Saved Books:</h2>
      <ul>
        {user.savedBooks.map((book: any) => (
          <li key={book.bookId}>
            <h3>{book.title}</h3>
            <p>{book.authors.join(', ')}</p>
            <p>{book.description}</p>
            <img src={book.image} alt={book.title} />
            <a href={book.link}>More Info</a>
          </li>
        ))}
      </ul>
    </div>
  );
};


import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Set up the Apollo Client with the URI of your GraphQL server
const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://your-apollo-server-endpoint', // Replace with your Apollo Server's endpoint
    credentials: 'same-origin', // Optional: Used for sending cookies with the request
  }),
  cache: new InMemoryCache(), // Apollo Cache for caching the responses
});

export default client;

import { ApolloProvider } from '@apollo/client'; 
import client from './apolloClient'; // Import your ApolloClient instance
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // If you are using routing


const App: React.FC = () => {
  return (
    // Wrap the entire app with ApolloProvider and pass the client as a prop
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};


import { gql } from 'apollo-boost'; // Import gql from Apollo Client

// Define your query
const GET_ME = gql`
  query {
    me {
      username
      email
      savedBooks {
        title
        authors
      }
    }
  }
`;

const Home: React.FC = () => {
  const { data, loading, error } = useQuery(GET_ME);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Welcome, {data.me.username}</h1>
      <ul>
        {data.me.savedBooks.map((book: any, index: number) => (
          <li key={index}>{book.title} by {book.authors.join(', ')}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://your-apollo-server-endpoint',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming the token is stored in localStorage
    },
  }),
  cache: new InMemoryCache(),
});
