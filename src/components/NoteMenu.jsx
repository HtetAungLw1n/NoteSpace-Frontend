import React from "react";
import { privateAxios } from "../utils/axios";

const NoteMenu = ({ id }) => {
  const handleDelete = async () => {
    try {
      await privateAxios.delete(`/notes/${id}/`);
      window.location.reload();
    } catch (err) {
      console.error("Failed to delete the note:", err);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="absolute top-6 right-2 hover:bg-neutral-700 cursor-pointer z-20 bg-neutral-800/50 backdrop-blur-sm text-sm rounded-lg text-center p-2 px-4"
    >
      Delete
    </button>
  );
};

export default NoteMenu;
