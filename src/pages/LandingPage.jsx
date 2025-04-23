import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center h-screen gap-10">
        <h1 className="text-6xl font-bold text-center">
          Welcome to <span className="text-gradient ">NoteSpace</span>
        </h1>
        <p className="text-gray-500 w-1/2 text-center text-pretty">
          NoteSpace is a note-taking app that allows you to take notes, organize
          your notes, and share your notes with others.
        </p>
        <Link
          to="/login"
          className="bg-secondary text-tertiary  px-4 py-2 rounded-md"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
