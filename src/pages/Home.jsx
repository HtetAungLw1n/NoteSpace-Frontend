import React, { useState } from "react";
import { Link } from "react-router-dom";
import LandingPage from "./LandingPage";
import NoteCover from "../components/NoteCover";
import { PlusIcon } from "lucide-react";
const Home = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      {!isLogin && <LandingPage />}
      {isLogin && (
        <div className="container mx-auto pt-40">
          <div className="flex flex-col justify-center px-26">
            <div
              className="text-6xl font-semibold py-2"
              style={{
                background:
                  "linear-gradient(45deg, #106110, #c0c79d 50%, #c0c79d 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Welcome, Htet Aung Lwin
            </div>
            <div className="flex gap-2 border-b py-4">
              <div className="text-2xl">My Notes</div>
            </div>
            <div className="">
              <Link
                to="/create"
                className="flex items-center gap-2 bg-primary rounded-full p-4 py-2 w-fit my-4"
              >
                <PlusIcon className="w-6 h-6 " /> Create Note
              </Link>
              <div className="grid grid-cols-3 gap-8 w-full place-items-center">
                <NoteCover />
                <NoteCover />
                <NoteCover />
                <NoteCover />
                <NoteCover />
                <NoteCover />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
