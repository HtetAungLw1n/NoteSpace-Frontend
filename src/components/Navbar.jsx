import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import SummarizePanel from "./SummarizePanel";
import { privateAxios } from "../utils/axios";
import { showToast } from "../utils/toast";

const Navbar = () => {
  const location = useLocation();
  const { id } = useParams();
  const [showSummary, setShowSummary] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [noteData, setNoteData] = useState(null);

  const isNotePage = location.pathname.startsWith("/notes/");

  // Toggle summary panel
  const handleToggleSummary = () => setShowSummary(!showSummary);

  const handleSummarize = () => {
    // TODO: Implement summarize
    setShowSummary(true);
  };

  // Update body class when summary panel is shown/hidden
  useEffect(() => {
    if (showSummary) {
      document.body.classList.add("summary-open");
    } else {
      document.body.classList.remove("summary-open");
    }

    return () => document.body.classList.remove("summary-open");
  }, [showSummary]);

  // Close summary panel when leaving notes page
  useEffect(() => {
    if (!isNotePage) setShowSummary(false);
  }, [location.pathname, isNotePage]);

  // Fetch note data when on a note page
  useEffect(() => {
    if (!id || !isNotePage) {
      setNoteData(null);
      return;
    }

    const fetchNoteData = async () => {
      try {
        const response = await privateAxios.get(`/notes/${id}/`);
        setNoteData(response.data);
      } catch (error) {
        console.error("Failed to fetch note data:", error);
      }
    };

    fetchNoteData();
  }, [id, isNotePage]);

  // Handle note publishing status toggle
  const handlePublishToggle = async () => {
    if (!id || isProcessing) return;

    const newPublicStatus = !noteData?.is_public;
    const actionText = newPublicStatus ? "publish" : "unpublish";

    try {
      setIsProcessing(true);
      await privateAxios.patch(`/notes/${id}/`, { is_public: newPublicStatus });
      showToast.success(`Note ${actionText}ed successfully`);

      // Update local state
      setNoteData((prev) => prev && { ...prev, is_public: newPublicStatus });
    } catch (error) {
      console.error(`Failed to ${actionText} note:`, error);
      showToast.error(`Failed to ${actionText} note`);
    } finally {
      setIsProcessing(false);
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("tokens");
    navigate("/login");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-neutral-900/30 backdrop-blur-md z-50">
        <div className="container mx-auto flex justify-between items-center h-full p-4 px-10">
          <Logo />
          {isNotePage ? <NotePageActions /> : <StandardNavLinks />}
        </div>
      </nav>

      <SummarizePanel isOpen={showSummary} />
    </>
  );

  // Component for the logo
  function Logo() {
    return (
      <Link to="/" className="flex items-center">
        <h1 className="text-2xl font-bold text-secondary py-2 font-orbitron">
          NoteSpace
        </h1>
      </Link>
    );
  }

  // Component for note page actions
  function NotePageActions() {
    const isPublished = noteData?.is_public;

    return (
      <div className="flex items-center gap-4">
        {showSummary && (
          <button
            onClick={handleToggleSummary}
            className="flex items-center justify-center w-10 h-10 rounded text-secondary cursor-pointer"
            aria-label="Close summary panel"
          >
            <ChevronRight size={18} />
          </button>
        )}
        <button
          onClick={handleSummarize}
          className="flex items-center px-4 h-10 rounded text-secondary hover:bg-secondary/10 transition-colors cursor-pointer"
        >
          Summarize
        </button>

        <button
          onClick={handlePublishToggle}
          className="flex items-center px-4 h-10 bg-primary text-white rounded hover:bg-primary/90 transition-colors cursor-pointer"
          disabled={isProcessing}
        >
          {isProcessing
            ? isPublished
              ? "Unpublishing..."
              : "Publishing..."
            : isPublished
            ? "Published"
            : "Publish"}
        </button>
      </div>
    );
  }

  // Component for standard navigation links
  function StandardNavLinks() {
    return (
      <div className="flex items-center gap-8">
        <Link
          to="/explore"
          className="text-secondary hover:text-primary transition-colors"
        >
          Explore
        </Link>
        <Link
          onClick={handleLogout}
          className="text-secondary hover:text-primary transition-colors"
        >
          Logout
        </Link>
      </div>
    );
  }
};

export default Navbar;
