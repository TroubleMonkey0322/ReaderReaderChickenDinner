import { gql } from '@apollo/client';

// LOGIN_USER mutation: Logs in a user with email and password
export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
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
  }
`;

// ADD_USER mutation: Adds a new user
export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
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

// SAVE_BOOK mutation: Saves a book to the user's savedBooks list
export const SAVE_BOOK = gql`
  mutation SaveBook($bookId: String!, $title: String!, $authors: [String!], $description: String!, $image: String, $link: String) {
    saveBook(bookId: $bookId, title: $title, authors: $authors, description: $description, image: $image, link: $link) {
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

// REMOVE_BOOK mutation: Removes a book from the user's savedBooks list
export const REMOVE_BOOK = gql`
  mutation RemoveBook($bookId: String!) {
    removeBook(bookId: $bookId) {
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
