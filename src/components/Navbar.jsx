import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { SearchIcon, Check, X, FileText } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showSummary, setShowSummary] = useState(false);
  // const [saveStatus, setSaveStatus] = useState("saved"); // "saved", "saving", "error"

  // Add/remove a class to the body when summary panel is shown
  useEffect(() => {
    const mainContent = document.querySelector(".notes-container");

    if (showSummary) {
      document.body.classList.add("summary-open");
      if (mainContent) {
        mainContent.style.width = "calc(100% - 24rem)";
        mainContent.style.transition = "all 300ms ease-in-out";
      }
    } else {
      document.body.classList.remove("summary-open");
      if (mainContent) {
        mainContent.style.width = "";
        mainContent.style.transition = "all 300ms ease-in-out";
      }
    }

    return () => {
      document.body.classList.remove("summary-open");
      if (mainContent) {
        mainContent.style.width = "";
      }
    };
  }, [showSummary]);

  const isNotePath = location.pathname.startsWith("/notes/");

  const handleGoBack = () => {
    navigate("/");
  };

  const handleSummarize = () => {
    setShowSummary(true);
  };

  const handleCloseSummary = () => {
    setShowSummary(false);
  };

  const handlePublish = () => {
    return null;
  };

  const Logo = () => (
    <Link to="/" className="flex items-center">
      <h1 className="text-2xl font-bold text-primary py-2">NoteSpace</h1>
    </Link>
  );

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-tertiary z-10">
        {isNotePath ? (
          // Navbar for notes page
          <div className="container mx-auto flex justify-between items-center p-4 px-10">
            <Logo />

            <div className="flex items-center gap-4">
              {/* <div className="text-sm mr-2">
                {saveStatus === "saved" && (
                  <span className="flex items-center text-green-500">
                    <Check size={16} className="mr-1" /> Saved
                  </span>
                )}
                {saveStatus === "saving" && (
                  <span className="text-primary/50">Saving...</span>
                )}
                {saveStatus === "error" && (
                  <span className="text-red-500">Error saving</span>
                )}
              </div> */}
              <button
                onClick={handleSummarize}
                className="px-4 rounded text-primary hover:bg-secondary/10 transition-colors"
              >
                Summarize
              </button>
              <button
                onClick={handlePublish}
                className="px-4 h-10 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
              >
                Publish
              </button>
            </div>
          </div>
        ) : (
          // Navbar for other pages
          <div className="container mx-auto flex justify-between items-center p-4 px-10">
            <Logo />

            <div className="flex items-center gap-8">
              <Link to="/">About</Link>
              <Link to="/">Contact</Link>
            </div>
          </div>
        )}
      </div>

      {/* Summary Panel - Fixed to right side */}
      <div
        className={`fixed top-0 right-0 bottom-0 bg-tertiary border-l border-gray-200 shadow-lg w-96 z-20 transition-transform duration-300 ${
          showSummary ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-8 h-full flex flex-col">
          <div className="flex justify-between items-center mb-10 border-b border-gray-200 pb-4">
            <h2 className="text-xl font-semibold text-primary">Summarize</h2>
            <button
              onClick={handleCloseSummary}
              className="text-primary hover:text-primary/70 rounded-full p-1 hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex items-center justify-center flex-grow">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText size={40} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-primary/80">
                No Summaries
              </h3>
              <p className="text-primary/60 mt-2 max-w-xs mx-auto">
                Please write the note first
              </p>
            </div>
          </div>

          <button
            className="mt-6 bg-primary text-white py-3 rounded hover:bg-primary/90 transition-colors w-full font-medium"
            disabled={true}
          >
            Generate Summary
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
