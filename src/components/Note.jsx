import React from "react";

const Note = () => {
    return (
        <div className="flex flex-col min-w-[40%] rounded-xl p-4 border border-neutral-400 hover:border-white transition-colors duration-300">
            <dir className="flex justify-between items-center">
                <p className="text-white">"No Pain, No Gain"</p>
                <p className="text-white">Kaze072</p>
            </dir>

            <p className="text-neutral-400 mt-4 text-sm text-balance">
                Progress often demands discomfort. Challenges, failures, and
                effort shape growth. Avoiding pain may feel safe, but it stalls
                development. Embrace struggle—it’s the price of success...
            </p>

            <h2 className="text-white text-sm mt-4">Updated 2 days ago</h2>
        </div>
    );
};

export default Note;
