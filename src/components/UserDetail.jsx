import React from 'react';
import { useParams } from 'react-router-dom';

const UserDetail = ({ user }) => {
  const { id } = useParams();

  // In a real application, you'd fetch the user data based on the id.
  
  return (
    <div>
      <h2>User Details</h2>
      {/* Render user details */}
    </div>
  );
};

export default UserDetail;
