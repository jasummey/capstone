import React from "react";
import { useAuth } from "./Auth";

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>User Profile</h1>
      {user ? (
        <div>
          <p>Username: {user.username}</p>
        </div>
      ) : (
        <p>User not logged in</p>
      )}
    </div>
  );
};

export default UserProfile;
