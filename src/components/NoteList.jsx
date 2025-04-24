import { PlusIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NoteCover from "./NoteCover";
import { privateAxios } from "../utils/axios";

const NoteList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const notes = await privateAxios.get("/notes/");
      setNotes(notes.data);
    };
    fetchNotes();
  }, []);
  return (
    <div className="">
      <Link
        to="/create"
        className="flex items-center gap-2 border-2 border-neutral-400 rounded-full p-4 py-2 w-fit my-4 hover:border-primary transition-all duration-300"
      >
        <PlusIcon className="w-6 h-6" />
        Create Note
      </Link>
      <div className="grid grid-cols-3 gap-8 w-full place-items-center pt-4">
        {notes.map((note) => (
          <NoteCover key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default NoteList;
