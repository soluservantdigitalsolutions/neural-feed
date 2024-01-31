import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import NoteStats from "../NoteStats/NoteStats";
import { useDispatch, useSelector } from "react-redux";
import { addAttendance } from "../../redux/feedSlice";
import axios from "axios";
import { NoteContext } from "../../context/noteContext";

const NotePreview = ({ note }) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { notes } = useContext(NoteContext);

  const handleAttendance = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/notes/${note._id}/attendances`,
        {},
        {
          withCredentials: true,
        }
      );
      // Dispatch the addAttendance action with the noteId and userId
      dispatch(
        addAttendance({ noteId: note._id, userId: currentUser.user._id })
      );
      console.log(note);
      console.log("Attended Successfully");
    } catch (error) {
      console.error("Error updating attendances:", error);
    }
  };
  return (
    <div className="border m-5">
      <div className="feedOwnerInfoDiv p-4 flex justify-between">
        <div className="feedOwnerInfoDiv flex gap-2.5 items-center">
          <img
            src={note.profileImage || ""}
            alt="profileImage"
            className="w-10 h-10 rounded-full object-cover transition cursor-pointer "
          />
          <Link to={`/profile/${note.authorName}`}>
            <div className="text-slate-600 cursor-pointer">
              <p className="font-semibold text-sm">{note.authorName || ""}</p>
            </div>
          </Link>
        </div>
      </div>
      <div className="p-4 rounded shadow flex flex-col justify-center items-center">
        <img
          src={note.imageUrl}
          alt={note.title}
          className="w-full h-64 object-cover mb-4 rounded"
        />
        <h2 className="text-xl font-bold mb-2">{note.title}</h2>
        <NoteStats
          comprehensions={note.comprehensions.length}
          attendances={note.attendances.length}
          noteId={note._id}
        />
        <Link
          to={`/notes/${note._id}`}
          className="mt-4 text-blue-500 hover:underline w-full"
        >
          <button
            onClick={handleAttendance}
            className=" w-full mt-5 bg-green-600 p-2 text-white rounded font-bold"
          >
            Feed More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotePreview;
