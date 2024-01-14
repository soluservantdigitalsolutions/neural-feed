import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { BarLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { updateEnrollments } from "../../redux/userSlice";
import ShareButton from "../../components/Share/ShareButton";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";
import TestButton from "../../components/TestButton/TestButton";

  const NoteContent = () => {
    const [note, setNote] = useState(null);
    const { id } = useParams();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const [feeder, setFeeder] = useState(null);
    const [loading, setLoading] = useState(false);

    // Define handleDropout and handleEnroll functions here

    useEffect(() => {
      const fetchNote = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/notes/${id}`
          );
          setNote(response.data);
          console.log(response);
        } catch (error) {
          console.error("Error fetching note:", error);
        }
      };

      fetchNote();
    }, [id]);

    if (!note)
      return (
        <div className="flex justify-center items-center h-[100vh]">
          <BarLoader width={100} height={25} color="#38a169" />
        </div>
      );

    return (
      <div className=" mx-auto p-4">
        <div className="bg-white rounded-lg p-2">
          <h1 className="text-3xl font-bold mb-4">{note?.title}</h1>
          <img
            src={note?.imageUrl}
            alt={note?.title}
            className="w-full h-auto mb-4 rounded"
          />
          <div
            dangerouslySetInnerHTML={{ __html: note.content }}
            className="prose mb-4"
          ></div>
          <div className="flex flex-wrap gap-2 mb-4">
            {note?.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="feedOwnerInfoDiv flex justify-between">
            <div className="feedOwnerInfoDiv flex gap-2.5 items-center">
              <img
                src={note?.profileImage || ""}
                alt="profileImage"
                className="w-10 h-10 rounded-full object-cover transition cursor-pointer "
              />
              <Link to={`/profile/${note?.username}`}>
                <div className="text-slate-600 cursor-pointer">
                  <p className="font-semibold text-sm">
                    {note?.username || ""}
                  </p>
                  <p className="text-sm">
                    {feeder?.length}
                    <span className="font-extrabold"> Admissions</span>
                  </p>
                </div>
              </Link>
            </div>
            <div className="enrollAndShareDiv flex">
              {feeder?.includes(currentUser?.user._id) ? (
                <div className="LoginButtonDiv border rounded bg-green-600 flex justify-center items-center font-bold">
                  <button
                    onClick={() => {
                      handleDropout();
                    }}
                    className="text-white text-lg p-1 hover:bg-green-600 transition hover:text-white active:bg-green-700 cursor-pointer"
                  >
                    Enrolled
                  </button>
                </div>
              ) : (
                <SecondaryButton
                  onClick={() => {
                    handleEnroll();
                  }}
                  SecondaryButtonText="Enroll"
                />
              )}
              <div className="shareFeedDiv flex gap-3 items-center">
                <ShareButton note={note} />
              </div>
            </div>
          </div>
          <TestButton feedId={note?._id} />
        </div>
      </div>
    );
  };

export default NoteContent;
