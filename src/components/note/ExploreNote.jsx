import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dateFormatter } from "../../utils/formatter";
import { Bookmark } from "lucide-react";
import { privateAxios } from "../../utils/axios";

const Note = ({ note, bookmarks, duration }) => {
  const formattedDate = dateFormatter(note?.updated_at);
  const [loading, setLoading] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkSave = async (e) => {
    e.stopPropagation();
    try {
      setLoading(true);
      const response = await privateAxios.post(`/notes/${note.id}/bookmark/`);
      console.log(response.data);
      if (response.data.code === "deleted") {
        setIsBookmarked(false);
      } else {
        setIsBookmarked(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(bookmarks);
    bookmarks.map((bookmark) => {
      console.log("hello");
      if (bookmark.id == note.id) {
        setIsBookmarked(true);
      }
    });
  }, []);

  return (
    <div className="flex flex-col min-w-[40%] justify-between rounded-xl p-4 border-2 border-neutral-400 hover:border-white bg-transparent transition-all duration-300">
      <div className="flex justify-between items-center">
        <Link to={`/notes/${note.id}`}>
          <p className="text-white text-xl ">
            "
            {note?.title
              ?.split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
            "
          </p>
        </Link>
        <p className="text-secondary/80 text-sm">{note?.user?.username}</p>
      </div>
      <p className="text-secondary/50 text-xs mt-4 line-clamp-2">
        {note?.summary?.content
          ? note?.summary?.content
          : "No Summary Generated"}
      </p>
      <div className="flex justify-between items-center mt-4">
        <h2 className="text-secondary/80 text-xs">{formattedDate}</h2>
        <button className="cursor-pointer" onClick={handleBookmarkSave}>
          <Bookmark className={`w-6 h-6 ${isBookmarked && "fill-white"}`} />
        </button>
      </div>
    </div>
  );
};

export default Note;
