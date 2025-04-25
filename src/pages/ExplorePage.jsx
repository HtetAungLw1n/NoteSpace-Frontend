import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Note from "../components/note/ExploreNote";
import { privateAxios } from "../utils/axios";
import { useLocation } from "react-router-dom";

const ExplorePage = () => {
    const [exploreNotes, setExploreNotes] = useState([]);
    const [bookmarks, setBookmarks] = useState([]);
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const searchNotes = async () => {
            try {
                setIsLoading(true);
                const response = await privateAxios.get(
                    `/notes/public?search=${query}`
                );
                setExploreNotes(response.data);
            } catch (error) {
                console.error("Failed to fetch public notes:", error);
            } finally {
                setIsLoading(false);
            }
        };

        searchNotes();
    }, [query]);

    const fetchExploreNotes = async () => {
        try {
            setIsLoading(true);
            const response = await privateAxios.get("/notes/public");
            setExploreNotes(response.data);
        } catch (error) {
            console.error("Failed to fetch public notes:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchBookmarks = async () => {
        try {
            setIsLoading(true);
            const response = await privateAxios.get("/bookmarks/");
            setBookmarks(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchExploreNotes();
        fetchBookmarks();
    }, [location.key]);

    return (
        <div className="container mx-auto pt-36">
            <h1 className="text-5xl font-semibold py-2 text-center text-gradient">
                Think Visually, Work Smarter
            </h1>
            <p className="text-lg text-center text-neutral-400 w-1/2 mx-auto mt-4">
                {" "}
                Instantly summarize your thoughts and explore them through
                smart, interactive graphs. Notes, leveled up.
            </p>

            <div className="flex items-center w-[35%] mx-auto mt-10 border border-secondary/40 px-2 py-3 rounded-xl focus-within:border-white transition-colors duration-300">
                <input
                    type="text"
                    placeholder="Search notes by title"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-[90%] px-2 outline-none bg-transparent text-white"
                />
                <Search className="text-neutral-400 w-[10%]" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 mt-10 px-32 py-10">
                {isLoading && bookmarks.length <= 0? (
                    <div className="loader"></div>
                ) : exploreNotes.length > 0 ? (
                    exploreNotes.map((note) => (
                        <Note key={note.id} note={note} bookmarks={bookmarks} />
                    ))
                ) : (
                    <div className="text-secondary text-lg text-start w-full">
                        No notes found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExplorePage;
