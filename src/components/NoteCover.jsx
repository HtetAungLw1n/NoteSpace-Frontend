import { Ellipsis } from "lucide-react";
import React, { useState } from "react";
import NoteMenu from "./NoteMenu";
import { Link } from "react-router-dom";

const NoteCover = ({ note }) => {
  const date = new Date(note.created_at);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Link
      to={`/note/${note.id}`}
      className="h-56 w-full relative rounded-xl bg-primary"
    >
      <div className="absolute top-2 right-2">
        <Ellipsis
          className="w-6 h-6 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
        />
        {isMenuOpen && <NoteMenu />}
      </div>
      <div className="absolute bottom-2 right-2">
        <div className="text-white text-sm">{formattedDate}</div>
      </div>
      <div className="absolute bottom-2 left-2">
        <div className="text-white text-4xl">{note.title}</div>
      </div>
    </Link>
  );
};

export default NoteCover;
