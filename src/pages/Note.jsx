import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { debounce } from "lodash";
import { privateAxios } from "../utils/axios";
import NoteEditor from "../components/note/NoteEditor";
import NoteTitleField from "../components/note/NoteTitleField";
import SaveStatusIndicator from "../components/note/SaveStatusIndicator";
import { decodeHTML, createInitialNoteState } from "../utils/utils";
import { motion } from "framer-motion";
import AIChat from "../components/chat/AIChat";
import { useNoteContext } from "../contexts/NoteContext";

const Note = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNewNote = id === "new";
  const userId = localStorage.getItem("uid") || "";
  const { setNoteData } = useNoteContext();

  const [note, setNote] = useState("");
  const [content, setContent] = useState("");
  const [editorFocused, setEditorFocused] = useState(false);
  const [saveStatus, setSaveStatus] = useState("saved");
  const [readonly, setReadonly] = useState(false);

  const noteRef = useRef({ title: "", content: "" });
  const isSaving = useRef(false);
  const initialLoadDone = useRef(false);
  const hasBeenEdited = useRef(false);

  // Save on unmount
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
          setNoteData(response.data);
          setNote(response.data.title);
          setReadonly(userId !== response.data.user.id);

          // Decode HTML entities before setting content
          const decodedContent = decodeHTML(response.data.content);
          setContent(decodedContent);

          // Avoid saving on initial load
          noteRef.current = {
            title: response.data.title,
            content: decodedContent,
          };

          // Mark as loaded after setting the data
          setTimeout(() => {
            initialLoadDone.current = true;
            setSaveStatus("saved");
          }, 100);
        } catch (err) {
          setSaveStatus("error");
        }
      };

      fetchNote();
    } else if (isNewNote) {
      const initialState = createInitialNoteState();
      setNote(initialState.title);
      setContent(initialState.content);
      noteRef.current = initialState;
      initialLoadDone.current = true;
      setNoteData(null);
    }
  }, [id, isNewNote, setNoteData]);

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

        // Update if not new note
        if (id && id !== "new") {
          const response = await privateAxios.patch(`/notes/${id}/`, {
            title: noteTitle,
            content: noteContent,
          });

          if (response.data) {
            setNoteData(response.data);
          }
        } else {
          // Create if new
          const response = await privateAxios.post("/notes/", {
            title: noteTitle,
            content: noteContent,
          });

          // After successful note creation, update context and redirect
          if (response.data && response.data.id) {
            setNoteData(response.data);
            navigate(`/notes/${response.data.id}`, {
              replace: true,
            });
          }
        }
        setSaveStatus("saved");
      } catch (err) {
        setSaveStatus("error");
      } finally {
        isSaving.current = false;
      }
    }, 1000)
  ).current;

  // Call debounced save whenever note changes
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

  // Event handlers
  const handleTitleChange = (e) => setNote(e.target.value);
  const handleContentChange = (value) => setContent(value);
  const handleEditorFocus = () => setEditorFocused(true);
  const handleEditorBlur = () => setEditorFocused(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="min-h-screen bg-tertiary text-primary"
    >
      <div className="container notes-container mx-auto">
        <div className="flex flex-col ml-6">
          {/* Title row with save indicator */}
          <div className="flex items-center justify-between mb-2">
            <NoteTitleField title={note} onChange={handleTitleChange} />
            {!readonly && (
              <div className="min-w-[120px] text-right mr-12">
                <SaveStatusIndicator status={saveStatus} />
              </div>
            )}
          </div>

          {/* Editor container */}
          <NoteEditor
            content={content}
            onChange={handleContentChange}
            isFocused={editorFocused}
            onFocus={handleEditorFocus}
            onBlur={handleEditorBlur}
            noteId={id}
          />
        </div>
      </div>

      {/* AI Chat component */}
      {!isNewNote && <AIChat noteId={id} />}
    </motion.div>
  );
};

export default Note;
