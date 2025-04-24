import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { privateAxios } from "../utils/axios";
import { debounce } from "lodash";

function Note() {
  // Navigation and routing
  const navigate = useNavigate();
  const { id } = useParams();
  const isNewNote = id === "new";

  // State management
  const [note, setNote] = useState("");
  const [content, setContent] = useState("");
  const [editorFocused, setEditorFocused] = useState(false);
  const [saveStatus, setSaveStatus] = useState("saved");

  // Refs for tracking state without re-renders
  const quillRef = useRef(null);
  const noteRef = useRef({ title: "", content: "" });
  const isSaving = useRef(false);
  const initialLoadDone = useRef(false);
  const hasBeenEdited = useRef(false);

  // Keep a ref to the current state for saving on unmount
  useEffect(() => {
    noteRef.current = { title: note, content };

    // Only mark as edited if content changed after initial load
    if (initialLoadDone.current) {
      hasBeenEdited.current = true;
    }
  }, [note, content]);

  // Load note data when component mounts
  useEffect(() => {
    if (id && !isNewNote) {
      const fetchNote = async () => {
        try {
          setSaveStatus("loading");
          initialLoadDone.current = false;
          hasBeenEdited.current = false;

          const response = await privateAxios.get(`/notes/${id}/`);
          setNote(response.data.title);
          setContent(response.data.content);

          // Update the ref directly to avoid triggering a save
          noteRef.current = {
            title: response.data.title,
            content: response.data.content,
          };

          // Mark as loaded after setting the data
          setTimeout(() => {
            initialLoadDone.current = true;
            setSaveStatus("saved");
          }, 100);
        } catch (err) {
          console.error("Error loading note:", err);
          setSaveStatus("error");
        }
      };

      fetchNote();
    } else if (isNewNote) {
      setNote("New Note");
      noteRef.current = { title: "New Note", content: "" };
      initialLoadDone.current = true;
    }
  }, [id, isNewNote]);

  // Configure Quill modules
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  // Create debounced save function
  const debouncedSave = useRef(
    debounce(async (noteTitle, noteContent) => {
      if (
        isSaving.current ||
        !initialLoadDone.current ||
        !hasBeenEdited.current
      ) {
        return;
      }

      isSaving.current = true;
      try {
        setSaveStatus("saving");

        // If it's not a new note and we have an ID, update
        if (id && id !== "new") {
          await privateAxios.patch(`/notes/${id}/`, {
            title: noteTitle,
            content: noteContent,
          });
        } else {
          // It's a new note, create it
          const response = await privateAxios.post("/notes/", {
            title: noteTitle,
            content: noteContent,
          });

          // If we get an ID back, navigate to the proper note URL
          if (response.data && response.data.id) {
            navigate(`/notes/${response.data.id}`, { replace: true });
          }
        }

        setSaveStatus("saved");
      } catch (err) {
        console.error("Error saving note:", err);
        setSaveStatus("error");
      } finally {
        isSaving.current = false;
      }
    }, 1000)
  ).current;

  // Call debounced save whenever note or content changes
  useEffect(() => {
    // Only save if the note has been edited after initial load
    if (initialLoadDone.current && hasBeenEdited.current && (note || content)) {
      setSaveStatus("saving");
      debouncedSave(note, content);
    }
  }, [note, content, debouncedSave]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSave.cancel();
    };
  }, [debouncedSave]);

  // Get save status indicator component
  const getSaveStatusIndicator = () => {
    switch (saveStatus) {
      case "saving":
        return (
          <div className="text-neutral-400 text-sm flex items-center">
            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse mr-2"></div>
            Saving...
          </div>
        );
      case "saved":
        return (
          <div className="text-neutral-400 text-sm flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
            Saved
          </div>
        );
      case "error":
        return (
          <div className="text-red-400 text-sm flex items-center">
            <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
            Error saving
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-tertiary text-primary">
      <div className="container notes-container mx-auto">
        <div className="flex flex-col ml-6">
          {/* Title row with save indicator */}
          <div className="flex items-center justify-between mb-2">
            <input
              type="text"
              value={note || ""}
              onChange={(e) => setNote(e.target.value)}
              className="text-5xl font-bold w-full focus:outline-none bg-transparent"
              placeholder="New Note"
              aria-label="Note title"
            />
            <div className="mr-4">{getSaveStatusIndicator()}</div>
          </div>

          {/* Editor container */}
          <div
            className={`quill-container ${
              editorFocused ? "editor-focused" : ""
            }`}
            onClick={() => {
              if (quillRef.current) {
                const editor = quillRef.current.getEditor();
                if (editor) editor.focus();
              }
            }}
          >
            <ReactQuill
              ref={quillRef}
              value={content}
              onChange={setContent}
              className="w-full min-h-[calc(100vh-250px)] bg-transparent resize-none focus:outline-none text-lg"
              placeholder="Start typing here..."
              theme="snow"
              modules={modules}
              onFocus={() => setEditorFocused(true)}
              onBlur={() => setEditorFocused(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Note;
