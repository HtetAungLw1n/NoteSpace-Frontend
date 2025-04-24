import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-neutral-900/30 backdrop-blur-md z-50">
        <div className="container mx-auto flex justify-between items-center p-4 px-10">
          <Link to="/">
            <h1 className="text-2xl font-bold">NoteSpace</h1>
          </Link>

          <div className="flex items-center gap-8">
            <Link to="/">About</Link>
            <Link to="/explore">Explore</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
