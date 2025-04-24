import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { privateAxios } from "../utils/axios";
import { debounce } from "lodash";

function Note() {
  const navigate = useNavigate();
  const [note, setNote] = useState("Untitled");
  const [content, setContent] = useState("");
  const [editorFocused, setEditorFocused] = useState(false);
  const [saveStatus, setSaveStatus] = useState("saved"); // saved, saving, error
  const quillRef = useRef(null);

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
      try {
        setSaveStatus("saving");
        console.log("saving")
        await privateAxios.post("/notes/", {
          title: noteTitle,
          content: noteContent,
        });
        setSaveStatus("saved");
      } catch (err) {
        console.error("Error saving note:", err);
        setSaveStatus("error");
      }
    }, 1500)
  ).current;

  // Call debounced save whenever note or content changes
  useEffect(() => {
    if (note || content) {
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

  return (
    <div className="min-h-screen bg-tertiary text-primary">
      <div className="container notes-container mx-auto pt-40 transition-all duration-300">
        <div className="flex flex-col px-26">
          <div className="mb-4">
            <input
              type="text"
              value={note || ""}
              onChange={(e) => setNote(e.target.value)}
              className="text-5xl font-bold w-full focus:outline-none"
              placeholder="Note Title"
            />
          </div>
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

          {/* Save status indicator */}
          <div className="text-sm text-right mt-2">
            {saveStatus === "saving" && (
              <span className="text-gray-400">Saving...</span>
            )}
            {saveStatus === "saved" && (
              <span className="text-green-500">Saved</span>
            )}
            {saveStatus === "error" && (
              <span className="text-red-500">Error saving</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Note;
