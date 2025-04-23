import { Link } from "react-router-dom";
import React, { useState } from "react";
import { SearchIcon } from "lucide-react";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <>
      <div className="fixed top-0 left-0 right-0">
        <div className="container mx-auto flex justify-between items-center p-4 px-10">
          <Link to="/">
            <h1 className="text-2xl font-bold">NoteSpace</h1>
          </Link>

          {!isLogin ? (
            <div className="flex items-center gap-8">
              <Link to="/">About</Link>
              <Link to="/">Contact</Link>
            </div>
          ) : (
            <div className="flex items-center gap-8">
              <Link to="/">Explore</Link>
              <Link to="/">Settings</Link>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search"
                  className="border border-gray-400 rounded-md pl-8 pr-2 py-1"
                />
                <SearchIcon className="absolute left-2 w-4 h-4 text-gray-400" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
