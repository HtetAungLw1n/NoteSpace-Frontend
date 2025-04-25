import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="container mx-auto">
      {/* hero section */}
      <div className="flex flex-col items-center justify-end h-[70vh] gap-10">
        <h1 className="text-6xl font-bold text-center">
          Welcome to <span className="text-gradient ">NoteSpace</span>
        </h1>
        <p className="text-gray-500 w-1/2 text-center text-pretty">
          NoteSpace is a note-taking app that allows you to take notes, organize
          your notes, and share your notes with others.
        </p>
        <Link
          to="/login"
          className="bg-primary text-secondary  px-6 py-3 rounded-md"
        >
          Get Started
        </Link>
      </div>

      {/* homepage demo */}
      <div className="flex flex-col items-center justify-center mt-10 ">
        <div className="w-[80%] h-[80vh] rounded-xl relative bg-neutral-900 border border-white/40 overflow-hidden">
          <img
            src="/homepage.png"
            alt=""
            className="absolute top-15 left-1/2 w-[85%] object-cover translate-x-[-50%] rounded-lg"
          />
        </div>
        <div className="text-secondary/50 mt-8">
          A place where you can create note and import pdf into notes
        </div>
      </div>

      {/* features section */}
      <div className="flex flex-col items-center justify-center mt-20 ">
        <div className="text-3xl font-bold mb-10">
          How our features deliver effectively in this app
        </div>
        <div className="flex justify-center items-center w-[90%] h-[50vh] gap-6">
          <div className="w-1/3 h-full bg-neutral-900  border border-white/40 rounded-xl"></div>
          <div className="w-1/3 h-full bg-neutral-900 border border-white/40  rounded-xl"></div>
          <div className="w-1/3 h-full bg-neutral-900 border border-white/40  rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
