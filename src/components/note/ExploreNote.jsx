import React from "react";
import { Link } from "react-router-dom";
import { dateFormatter } from "../../utils/formatter";

const Note = ({ note }) => {
  const formattedDate = dateFormatter(note?.updated_at);
  return (
    <Link className="flex flex-col min-w-[40%] justify-between rounded-xl p-4 border-2 border-neutral-400 hover:border-white bg-transparent transition-all duration-300">
      <div className="flex justify-between items-center">
        <p className="text-white text-xl ">
          "
          {note?.title
            ?.split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
          "
        </p>
        <p className="text-secondary/80 text-sm">{note?.user?.username}</p>
      </div>
      <p className="text-secondary/50 text-xs mt-4 line-clamp-2">
        {note?.summary?.content
          ? note?.summary?.content
          : "No Summary Generated"}
      </p>
      <h2 className="text-secondary/80 text-xs mt-4">{formattedDate}</h2>
    </Link>
  );
};

export default Note;
