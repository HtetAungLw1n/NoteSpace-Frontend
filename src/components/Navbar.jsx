import { Link } from "react-router-dom";
import React, { useState } from "react";
import { SearchIcon } from "lucide-react";

const Navbar = () => {
    const [isLogin, setIsLogin] = useState(false);
    return (
        <>
            <div className="fixed top-0 left-0 right-0">
                <div className="container mx-auto flex justify-between items-center p-4 px-10">
                    <Link to="/">
                        <h1 className="text-2xl font-bold">NoteSpace</h1>
                    </Link>

                    <div className="flex items-center gap-8">
                        <Link to="/">About</Link>
                        <Link to="/explore">Explore</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
