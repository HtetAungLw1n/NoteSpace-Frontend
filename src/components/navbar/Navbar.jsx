import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Logo from "./Logo";
import NotePageActions from "./NotePageActions";
import StandardNavLinks from "./StandardNavLinks";
import SummarizePanel from "../summary/SummarizePanel";
import { privateAxios } from "../../utils/axios";
import { showToast } from "../../utils/toast";
import { useUIContext } from "../../contexts/UIContext";
import { useNoteContext } from "../../contexts/NoteContext";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const userId = localStorage.getItem("uid") || "";
    const { isSummaryOpen, setIsSummaryOpen } = useUIContext();
    const { noteData, setNoteData } = useNoteContext();
    const [readonly, setReadonly] = useState(true);

    const [isProcessing, setIsProcessing] = useState(false);
    const [isSummarizing, setIsSummarizing] = useState(false);
    const [isLoadingSummary, setIsLoadingSummary] = useState(false);

    const isNotePage = location.pathname.startsWith("/notes/");

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await privateAxios.get(`/notes/${id}`)
                setReadonly(userId !== response.data.user.id);
            } catch (error) {
                console.log(error);
            }
        };
        fetchNote();
    });

    const fetchSummaryData = async () => {
        if (!id) return;

        try {
            const startTime = Date.now();
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, 300 - elapsedTime);

            setTimeout(() => {
                setIsLoadingSummary(false);
            }, remainingTime);
        } catch (error) {
            setTimeout(() => {
                setIsLoadingSummary(false);
            }, 300);
        }
    };

    // Toggle summary panel visibility
    const handleToggleSummary = () => {
        const newShowSummary = !isSummaryOpen;
        setIsSummaryOpen(newShowSummary);

        if (newShowSummary && id) {
            setIsLoadingSummary(true);
            setTimeout(() => {
                fetchSummaryData();
            }, 1000);
        } else if (!newShowSummary) {
            if (isLoadingSummary) {
                setIsLoadingSummary(false);
            }
        }
    };

    const handleSummarize = async () => {
        if (!id || isSummarizing) return;

        if (readonly) {
            showToast.error("Access denied")
            return;
        }

        try {
            setIsSummarizing(true);
            setIsSummaryOpen(true);

            await privateAxios.get(`/notes/${id}/summary/`);

            const updatedNote = await privateAxios.get(`/notes/${id}/`);
            setNoteData(updatedNote.data);

      setTimeout(() => {
        setIsSummarizing(false);
      }, 300);
    } catch (error) {
      showToast.error("Failed to generate summary");
      setIsSummarizing(false);
    }
  };

    const handlePublishToggle = async () => {
        if (!id || isProcessing) return;

        const newPublicStatus = !noteData?.is_public;
        const actionText = newPublicStatus ? "publish" : "unpublish";

        try {
            setIsProcessing(true);
            const response = await privateAxios.patch(`/notes/${id}/`, {
                is_public: newPublicStatus,
            });
            showToast.success(`Note ${actionText}ed successfully`);

            if (response.data) {
                setNoteData(response.data);
            }
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
    navigate("/");
    window.location.reload();
  };

    // Reset states when switching notes
    useEffect(() => {
        if (id) {
            setIsSummaryOpen(true);
            setIsLoadingSummary(true);

            setTimeout(() => {
                fetchSummaryData();
            }, 1000);
        }
    }, [id, setIsSummaryOpen]);

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
        const pathSegments = location.pathname.split("/").filter(Boolean);
        // Show summary only on direct note editing pages (/notes/{id})
        const isNoteEditingPage =
            pathSegments.length === 2 && pathSegments[0] === "notes";

    if (!isNoteEditingPage) {
      setIsSummaryOpen(false);
      setIsSummarizing(false);
    }
  }, [location.pathname, setIsSummaryOpen]);

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
        summary={noteData}
        isSummarizing={isSummarizing || isLoadingSummary}
        isSummarizeButtonClicked={isSummarizing}
      />
    </>
  );
};

export default Navbar;
