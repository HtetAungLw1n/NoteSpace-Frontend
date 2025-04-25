import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Logo from "./Logo";
import NotePageActions from "./NotePageActions";
import StandardNavLinks from "./StandardNavLinks";
import SummarizePanel from "../summary/SummarizePanel";
import { privateAxios } from "../../utils/axios";
import { showToast } from "../../utils/toast";
import { useUIContext } from "../../contexts/UIContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { isSummaryOpen, setIsSummaryOpen } = useUIContext();

  const [isProcessing, setIsProcessing] = useState(false);
  const [noteData, setNoteData] = useState(null);
  const [summaryData, setSummaryData] = useState(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);

  // Derived state
  const isNotePage = location.pathname.startsWith("/notes/");

  // Fetch summary data from the API
  const fetchSummaryData = async () => {
    if (!id) return;

    try {
      setIsLoadingSummary(true);
      const startTime = Date.now();

      const response = await privateAxios.get(`/notes/${id}/summary/`);
      setSummaryData(response.data);

      // Ensure loading state is visible for at least 300ms for better UX
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 300 - elapsedTime);

      setTimeout(() => {
        setIsLoadingSummary(false);
      }, remainingTime);
    } catch (error) {
      console.log("No existing summary found");
      setSummaryData(null);
      setTimeout(() => {
        setIsLoadingSummary(false);
      }, 300);
    }
  };

  // Toggle summary panel visibility
  const handleToggleSummary = () => {
    const newShowSummary = !isSummaryOpen;
    setIsSummaryOpen(newShowSummary);

    // If opening the panel, fetch the latest summary
    if (newShowSummary && id) {
      fetchSummaryData();
    } else if (!newShowSummary) {
      // If closing the panel while still loading, cancel loading state
      if (isLoadingSummary) {
        setIsLoadingSummary(false);
      }
    }
  };

  // Generate or refresh summary
  const handleSummarize = async () => {
    if (!id || isSummarizing) return;

    try {
      setIsSummarizing(true);
      setIsSummaryOpen(true);

      const response = await privateAxios.get(`/notes/${id}/summary/`);
      setSummaryData(response.data);
      setTimeout(() => {
        setIsSummarizing(false);
      }, 300);
    } catch (error) {
      console.error("Failed to summarize note:", error);
      showToast.error("Failed to summarize note");
      setIsSummarizing(false);
    }
  };

  // Toggle publish status for current note
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

  // Logout and redirect to login page
  const handleLogout = () => {
    localStorage.removeItem("tokens");
    navigate("/login");
  };

  // Reset states when switching notes
  useEffect(() => {
    if (id) {
      setSummaryData(null);
      setIsSummaryOpen(false);
      setIsSummarizing(false);
    }
  }, [id, setIsSummaryOpen]);

  // Fetch note data when on a note page
  useEffect(() => {
    if (!id || !isNotePage) {
      setNoteData(null);
      setSummaryData(null);
      setIsSummaryOpen(false);
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch note data
        const noteResponse = await privateAxios.get(`/notes/${id}/`);
        setNoteData(noteResponse.data);
      } catch (error) {
        console.error("Failed to fetch note data:", error);
      }
    };

    fetchData();
  }, [id, isNotePage]);

  // Update body class when summary panel is shown/hidden
  useEffect(() => {
    if (isSummaryOpen) {
      document.body.classList.add("summary-open");
    } else {
      document.body.classList.remove("summary-open");
    }

    return () => document.body.classList.remove("summary-open");
  }, [isSummaryOpen]);

  // Close summary panel when leaving notes page
  useEffect(() => {
    if (!isNotePage) {
      setIsSummaryOpen(false);
      setSummaryData(null);
      setIsSummarizing(false);
    }
  }, [location.pathname, isNotePage, setIsSummaryOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-neutral-900/30 backdrop-blur-md z-50">
        <div className="container mx-auto flex justify-between items-center h-full p-4">
          <Logo />

          {isNotePage ? (
            <NotePageActions
              showSummary={isSummaryOpen}
              onToggleSummary={handleToggleSummary}
              onSummarize={handleSummarize}
              onPublishToggle={handlePublishToggle}
              isSummarizing={isSummarizing}
              isProcessing={isProcessing}
              isPublished={noteData?.is_public}
            />
          ) : (
            <StandardNavLinks onLogout={handleLogout} />
          )}
        </div>
      </nav>

      <SummarizePanel
        isOpen={isSummaryOpen}
        summary={summaryData}
        isSummarizing={isSummarizing || isLoadingSummary}
      />
    </>
  );
};

export default Navbar;
