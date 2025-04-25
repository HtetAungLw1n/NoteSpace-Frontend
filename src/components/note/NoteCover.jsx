import { Ellipsis } from "lucide-react";
import React, { useState } from "react";
import NoteMenu from "./NoteMenu";
import { Link } from "react-router-dom";
import { dateFormatter } from "../../utils/formatter";
import BookmarkMenu from "./BookmarkMenu";

const NoteCover = ({ note, fetchNotes, fetchBookmarks, page }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const formattedDate = dateFormatter(note?.updated_at);

    return (
        <Link
            to={`/notes/${note.id}`}
            className="h-56 w-full relative rounded-xl border border-primary/50 bg-neutral-900 hover:border-primary hover:shadow-primary hover:shadow-md transition-all duration-300"
        >
            <div className="absolute top-2 right-4">
                <Ellipsis
                    className="w-6 h-6 cursor-pointer"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsMenuOpen(!isMenuOpen);
                    }}
                />
                {isMenuOpen && page === "notes" && (
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                        }}
                    >
                        <NoteMenu id={note.id} fetchNotes={fetchNotes} />
                    </div>
                )}

                {isMenuOpen && page === "bookmarks" && (
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                        }}
                    >
                        <BookmarkMenu id={note.bookmark_id} fetchBookmarks={fetchBookmarks} />
                    </div>
                )}
            </div>
            <div className="absolute bottom-4 right-4">
                <div className="text-white text-sm opacity-70">
                    {formattedDate}
                </div>
            </div>
            <div className="absolute bottom-4 left-4 max-w-52 line-clamp-2">
                <div className="text-white text-3xl break-words">
                    {note.title}
                </div>
            </div>
        </Link>
    );
};

export default NoteCover;
