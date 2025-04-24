import React from "react";
import { Link } from "react-router-dom";
import { dateFormatter } from "../utils/formatter";

const Note = ({ note }) => {
  const formattedDate = dateFormatter(note?.updated_at);
  return (
    <Link className="flex flex-col min-w-[40%] rounded-xl p-4 border-2 border-neutral-400 hover:border-white bg-transparent transition-all duration-300">
      <div className="flex justify-between items-center">
        <p className="text-white text-xl font-semibold">{note?.title}</p>
        <p className="text-white">{note?.user?.username}</p>
      </div>

      <p className="text-neutral-400 mt-4 text-sm text-balance line-clamp-2">
        {note?.content ? note?.content : "No content"}
      </p>

      <h2 className="text-white text-sm mt-4">{formattedDate}</h2>
    </Link>
  );
};

export default Note;
