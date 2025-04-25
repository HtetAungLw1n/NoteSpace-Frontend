import React, { useEffect, useState } from "react";
import LandingPage from "./LandingPage";
import { privateAxios } from "../utils/axios";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Bookmark, NotepadText } from "lucide-react";
import { motion } from "framer-motion";

const Home = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const tokens = localStorage.getItem("tokens");
    if (tokens) {
      setIsLogin(true);
    }
    try {
      const fetchUserInfo = async () => {
        setIsLoading(true);
        const userInfo = await privateAxios.get("/auth/users/me/");
        setUserInfo(userInfo.data);
      };
      fetchUserInfo();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {!isLogin && <LandingPage />}
      {isLogin && (
        <motion.div
          className="container mx-auto pt-40 pb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
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
              Welcome,{" "}
              {isLoading ? <div className="loader"></div> : userInfo.username}
            </div>
            <div className="flex justify-between items-center gap-2 border-b py-4">
              <div className="text-2xl">
                {location.pathname === "/bookmarks"
                  ? "My Bookmarks"
                  : "My Notes"}
              </div>
              <div className="flex p-2 bg-neutral-800 rounded-xl gap-2">
                <NavLink
                  to={"/"}
                  className={({ isActive }) =>
                    `px-3 py-2 ${isActive && "bg-primary"} rounded-lg`
                  }
                >
                  <NotepadText size={20} strokeWidth={1.5} />
                </NavLink>
                <NavLink
                  to={"/bookmarks"}
                  className={({ isActive }) =>
                    `px-3 py-2 ${isActive && "bg-primary"} rounded-lg`
                  }
                >
                  <Bookmark size={20} strokeWidth={1.5} />
                </NavLink>
              </div>
            </div>
            <Outlet />
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Home;
