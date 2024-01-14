import React from "react";
import { FcIdea } from "react-icons/fc";
import { MdCoPresent}from "react-icons/md"

const NoteStats = ({ comprehensions, attendances }) => {
  return (
    <div className="flex gap-4">
      <div className="flex items-center">
        <FcIdea className="text-2xl" />
        <h1 className="ml-2 font-bold text-lg">{comprehensions}</h1>
      </div>
      <div className="flex items-center">
        <MdCoPresent className="text-2xl" />
        <h1 className="ml-2 font-bold text-lg">{attendances}</h1>
      </div>
    </div>
  );
};

export default NoteStats;
