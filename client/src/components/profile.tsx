import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_PROFILE = gql`
  query GetProfile {
    getProfile {
      id
      username
      email
    }
  }
`;

const Profile = () => {
  const { loading, error, data } = useQuery(GET_PROFILE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Profile</h2>
      <p><strong>ID:</strong> {data.getProfile.id}</p>
      <p><strong>Username:</strong> {data.getProfile.username}</p>
      <p><strong>Email:</strong> {data.getProfile.email}</p>
    </div>
  );
};

export default Profile;
