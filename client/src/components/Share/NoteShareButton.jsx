import React from "react";
import { BsShareFill } from "react-icons/bs";
import { copyToClipboard } from "../../utils/modules";

const NoteShareButton = ({ note }) => {
  const handleShare = () => {
    copyToClipboard("https://neuralfeed.onrender.com/notes", note._id);
  };

  return (
    <button
      className="border flex p-2 rounded bg-green-500 gap-2.5 text-white"
      onClick={handleShare}
    >
      <BsShareFill className="text-2xl" /> Share
    </button>
  );
};

export default NoteShareButton;
