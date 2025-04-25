import React from "react";

const NoteTitleField = ({ title, onChange }) => {
  return (
    <div className="w-[70%] summary-open:w-[60%]">
      <input
        type="text"
        value={title || ""}
        onChange={onChange}
        className="text-5xl font-bold w-full focus:outline-none bg-transparent truncate"
        placeholder="New Note"
        aria-label="Note title"
        title={title || "New Note"}
        maxLength={255}
      />
    </div>
  );
};

export default NoteTitleField;
