import { FileUp, BookmarkIcon, PlusIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteCover from "./NoteCover";
import { privateAxios } from "../../utils/axios";
import ImportModal from "../modal/ImportModal";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      const notes = await privateAxios.get("/notes/");
      setNotes(notes.data);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreateNote = async () => {
    try {
      const response = await privateAxios.post("/notes/", {
        title: "Untitled",
        content: "",
      });
      if (response.data && response.data.id) {
        navigate(`/notes/${response.data.id}`);
      }
    } catch (err) {
      console.error("Failed to create new note:", err);
    }
  };

  return (
    <div className="">
      <div className="flex gap-2">
        <button
          onClick={handleCreateNote}
          className="cursor-pointer flex items-center gap-2 border-2 border-neutral-400 rounded-xl p-4 py-2 w-fit my-4 hover:border-primary transition-all duration-300"
        >
          <PlusIcon className="w-6 h-6" />
          Create Note
        </button>
        <button
          onClick={() => setImportModalOpen(true)}
          className="cursor-pointer flex items-center gap-2 border-2 border-neutral-400 rounded-xl p-4 py-2 w-fit my-4 hover:border-primary transition-all duration-300"
        >
          <FileUp className="w-5 h-5" />
          Import PDF
        </button>
        <button
          onClick={() => setImportModalOpen(true)}
          className="cursor-pointer flex items-center gap-2 p-2 py-2 w-fit my-4 hover:border-primary transition-all duration-300"
        >
          <BookmarkIcon className="w-7 h-7" />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-8 w-full place-items-center pt-4">
        {notes.length === 0 ? (
          <div className="text-secondary text-lg text-start w-full">
            No notes found. Start creating notes.
          </div>
        ) : (
          notes.map((note) => (
            <NoteCover key={note.id} note={note} fetchNotes={fetchNotes} />
          ))
        )}
      </div>

      {importModalOpen && (
        <ImportModal onClose={() => setImportModalOpen(false)} />
      )}
    </div>
  );
};

export default NoteList;
