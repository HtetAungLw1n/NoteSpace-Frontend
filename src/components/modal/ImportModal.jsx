import { Download, DownloadIcon, PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { privateAxios } from "../../utils/axios";
import { showToast } from "../../utils/toast";

const ImportModal = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file.size > 2097152) {
      showToast.error("File size limit 2MB reached!");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      const response = await privateAxios.post("/notes/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate(`/notes/${response.data.note}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="absolute top-0 left-0 w-screen h-full bg-black/60 z-100 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="w-[50%] h-[70%] bg-black border-2 border-dashed border-white/40 rounded-lg flex flex-col items-center justify-center cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          document.getElementById("fileInput").click();
        }}
      >
        <input
          type="file"
          id="fileInput"
          className="hidden"
          accept=".pdf"
          onChange={handleFileChange}
        />
        {loading ? (
          <img
            src="/loading.gif"
            alt=""
            className="w-44 h-44"
            loop="infinite"
          />
        ) : (
          <DownloadIcon className="w-20 h-20 bg-neutral-900 rounded-full p-5 border-2 border-white/40" />
        )}
        {/* <p className="text-white/40 mt-4">Click here to upload</p> */}
      </div>
    </div>
  );
};

export default ImportModal;
