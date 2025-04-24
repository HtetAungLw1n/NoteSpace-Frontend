import React, { useEffect, useState } from "react";
import LandingPage from "./LandingPage";
import { privateAxios } from "../utils/axios";
import NoteList from "../components/NoteList";
const Home = () => {
  const [isLogin, setIsLogin] = useState(false);

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const tokens = localStorage.getItem("tokens");
    if (tokens) {
      setIsLogin(true);
    }
    const fetchUserInfo = async () => {
      const userInfo = await privateAxios.get("/auth/users/me/");
      setUserInfo(userInfo.data);
    };
    fetchUserInfo();
  }, []);

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
                  "linear-gradient(90deg, rgba(61, 61, 184, 1) 0%, rgba(0, 212, 255, 1) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Welcome, {userInfo.username}
            </div>
            <div className="flex gap-2 border-b py-4">
              <div className="text-2xl">My Notes</div>
            </div>
            <NoteList />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
