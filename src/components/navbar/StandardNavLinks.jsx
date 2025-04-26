import React from "react";
import { Link } from "react-router-dom";

// Explore and logout buttons
const StandardNavLinks = ({ onLogout, isLoggedIn }) => {
  return (
    <div className="flex items-center gap-8">
      <Link
        to="/explore"
        className="text-secondary hover:text-primary transition-colors"
      >
        Explore
      </Link>
      {!isLoggedIn && (
        <Link
          to="/login"
          className="text-secondary hover:text-primary transition-colors cursor-pointer"
        >
          Login
        </Link>
      )}
      {isLoggedIn && (
        <button
          onClick={onLogout}
          className="text-secondary hover:text-primary transition-colors cursor-pointer"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default StandardNavLinks;
