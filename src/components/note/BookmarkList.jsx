import { FileUp, BookmarkIcon, PlusIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteCover from "./NoteCover";
import { privateAxios } from "../../utils/axios";
import ImportModal from "../modal/ImportModal";
import { motion } from "framer-motion";

const BookmarkList = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchBookmarks = async () => {
    try {
      const response = await privateAxios.get("/bookmarks/");
      setBookmarks(response.data);
    } catch (err) {
      console.error("Failed to fetch bookmarks:", err);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="grid grid-cols-3 gap-8 w-full place-items-center pt-10">
        {bookmarks.length === 0 ? (
          <div className="text-secondary text-lg text-start w-full">
            No bookmarks found.
          </div>
        ) : (
          bookmarks.map((bookmark) => (
            <NoteCover
              key={bookmark.id}
              note={bookmark}
              fetchNotes={fetchBookmarks}
              fetchBookmarks={fetchBookmarks}
              page={"bookmarks"}
            />
          ))
        )}
      </div>

      {importModalOpen && (
        <ImportModal onClose={() => setImportModalOpen(false)} />
      )}
    </motion.div>
  );
};

export default BookmarkList;
