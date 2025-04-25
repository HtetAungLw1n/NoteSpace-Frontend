import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { privateAxios } from "../../utils/axios";

// Rich text editor for note content with formatting options
const NoteEditor = ({ content, onChange, isFocused, onFocus, onBlur, noteId }) => {
  const quillRef = useRef(null);
  const userId = localStorage.getItem('uid') || 'asdf';
  const [author, setAuthor] = useState('');
  const [readonly, setReadonly] = useState(false);

  useEffect(() => {
    const fetchAuthor = async () => {
        try {
            const response = await privateAxios.get(`/notes/${noteId}`)
            if (response.data.user.id === userId) {
                setReadonly(false);
            } else {
                setReadonly(true);
            }
        } catch (error) {
            console.log(error);
        }
    }
    fetchAuthor();
  }, [])

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

  return (
    <div
      className={`quill-container ${isFocused ? "editor-focused" : ""}`}
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
        onChange={onChange}
        className="w-full min-h-[calc(100vh-250px)] bg-transparent resize-none focus:outline-none text-md"
        placeholder="Start typing here..."
        theme="snow"
        modules={modules}
        onFocus={onFocus}
        onBlur={onBlur}
        readOnly={readonly}
      />
    </div>
  );
};

export default NoteEditor;
