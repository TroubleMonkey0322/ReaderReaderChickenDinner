import { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';

import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import type { User } from '../models/User';

const SavedBooks = () => {
  const [userData, setUserData] = useState<User>({
    username: '',
    email: '',
    password: '',
    savedBooks: [],
  });

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await getMe(token);

        if (!response.ok) {
          throw new Error('something went wrong!');
        }

        const user = await response.json();
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [userDataLength]);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId: string) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await deleteBook(bookId, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className='text-light bg-dark p-5'>
        <Container>
          {userData.username ? (
            <h1>Viewing {userData.username}'s saved books!</h1>
          ) : (
            <h1>Viewing saved books!</h1>
          )}
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? 'book' : 'books'
              }:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col md='4'>
                <Card key={book.bookId} border='dark'>
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant='top'
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button
                      className='btn-block btn-danger'
                      onClick={() => handleDeleteBook(book.bookId)}
                    >
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;

import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from './queries';  // Import the GET_ME query
import { REMOVE_BOOK } from './queries'; // Import the REMOVE_BOOK mutation
import { Book } from './types'; // Adjust as per your types

const BookListComponent: React.FC = () => {
  // Use the useQuery hook to fetch the user data
  const { data, loading, error } = useQuery(GET_ME);

  // If there's loading or error, show loading/error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const userData = data?.me; // Assuming the response has a `me` field with user info

  // If there's no user data, you can redirect or show a message
  if (!userData) return <p>No user data found.</p>;

  // REMOVE_BOOK mutation
  const [removeBookMutation] = useMutation(REMOVE_BOOK);

  const handleDeleteBook = async (bookId: string) => {
    try {
      const { data } = await removeBookMutation({
        variables: { bookId },
      });

      // Assuming removeBookId is responsible for updating the local state
      removeBookId(bookId);

      console.log('Book deleted:', data);
    } catch (err) {
      console.error('Error removing book:', err);
    }
  };

  // Function to remove bookId from local state or anywhere it's stored
  const removeBookId = (bookId: string) => {
    // Implement the logic for removing the book ID from the local state or data
    console.log('Book removed from state:', bookId);
  };

  return (
    <div>
      <h1>Your Books</h1>
      <ul>
        {userData.savedBooks.map((book: Book) => (
          <li key={book.bookId}>
            <span>{book.title}</span>
            <button onClick={() => handleDeleteBook(book.bookId)}>
              Remove Book
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookListComponent;

import { gql } from '@apollo/client';

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      savedBooks {
        bookId
        title
        authors
        description
      }
    }
  }
`;
