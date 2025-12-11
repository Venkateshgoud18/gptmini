import React from "react";
import { jwtDecode } from "jwt-decode";
import "./profile.css";

function UserProfile() {
  let username = "";
  let email = "";

  try {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      username = decoded.username;
      email = decoded.email;
    }
  } catch (error) {
    console.error("Invalid token", error);
  }

  return (
    <div className="user-profile">
      <h2>User Profile</h2>

      <div className="profile-card">
        <p><strong>Username:</strong> {username || "Unknown User"}</p>
        <p><strong>Email:</strong> {email || "No Email"}</p>
      </div>
    </div>
  );
}

export default UserProfile;
