import React, { useContext, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import NoteStats from "../NoteStats/NoteStats";
import { useDispatch, useSelector } from "react-redux";
import { addAttendance } from "../../redux/feedSlice";
import axios from "axios";
import { NoteContext } from "../../context/noteContext";
import { Dialog, Transition } from "@headlessui/react";

const NotePreview = ({ note }) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { notes } = useContext(NoteContext);
  const [showSignUpPrompt, setShowSignUpPrompt] = useState(false);

  const handleAttendance = async () => {
    if (!currentUser) {
      setShowSignUpPrompt(true);
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:3000/api/notes/${note._id}/attendances`,
        {},
        {
          withCredentials: true,
        }
      );
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
      <Transition appear show={showSignUpPrompt} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setShowSignUpPrompt(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Sign Up
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Please Register in order for you to support and Consume the
                  feed
                </p>
              </div>
              <div className="mt-4">
                <Link to="/register">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  >
                    Register
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default NotePreview;
