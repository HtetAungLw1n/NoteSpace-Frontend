import React from "react";
import { Search } from "lucide-react";
import Note from "../components/Note";

const ExplorePage = () => {
    return (
        <div className="container mx-auto pt-36">
            <h1 className="text-5xl font-semibold py-2 text-center text-[#9747FF] drop-shadow-[0_0_25px_rgba(151,71,255,0.7)]">
                Think Visually, Work Smarter
            </h1>
            <p className="text-lg text-center text-neutral-400 w-1/2 mx-auto mt-4">
                {" "}
                Instantly summarize your thoughts and explore them through
                smart, interactive graphs. Notes, leveled up.
            </p>

            <div className="flex items-center w-[35%] mx-auto mt-10 border border-white px-2 py-3 rounded-xl">
                <input
                    type="text"
                    placeholder="Search notes by title"
                    className="w-[90%] px-2 outline-none"
                />
                <Search className="text-neutral-400 w-[10%]"/>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 mt-10 px-18">
                <Note />
                <Note />
                <Note />
                <Note />
                <Note />
                <Note />
            </div>
        </div>
    );
};

export default ExplorePage;
