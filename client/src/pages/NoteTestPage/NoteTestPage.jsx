import React, { useState, useEffect, Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Transition, Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { useSelector } from "react-redux";

const NoteTestPage = () => {
  const { noteId } = useParams();
  const [note, setNote] = useState(null);
  console.log(note);
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState({
    correctAnswers: 0,
    totalQuestions: 0,
  });
  const [selectedOptions, setSelectedOptions] = useState({});
  const [loading, setLoading] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showSignUpPrompt, setShowSignUpPrompt] = useState(false);
  const { currentUser } = useSelector((state) => state.user); // Adjust according to your state management

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(
          `https://neural-feed-backend-2yg8.onrender.com/api/notes/${noteId}`
        );
        setNote(response.data);
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNote();
  }, [noteId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Check if there is a current user
    if (!currentUser) {
      // If no current user, show the sign-up prompt
      setShowSignUpPrompt(true);
      return; // Prevent further execution
    }
    setLoading(true);

    try {
      const response = await axios.post(
        `https://neural-feed-backend-2yg8.onrender.com/api/notes/updateComprehensionAndHats`, // Corrected endpoint
        {
          selectedOptions,
          noteId: noteId, // Ensure this is the correct property for the note ID
        },
        {
          withCredentials: true,
        }
      );

      let correctAnswers = 0;
      let totalQuestions = 0;

      for (let i = 0; i < note.tests.length; i++) {
        const test = note.tests[i];
        const selectedOption = selectedOptions[test.question];
        if (selectedOption && selectedOption === test.answer) {
          correctAnswers++;
        }
        totalQuestions++;
      }

      setResult({
        correctAnswers,
        totalQuestions,
      });

      setOpen(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleReNote = () => {
    navigate(`/notes/${noteId}`);
  };

  if (!note) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <BarLoader width={100} height={25} color="#38a169" />
      </div>
    );
  }

  return (
    <motion.div
      className="m-none m-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <form onSubmit={handleSubmit}>
        <div className="bg-green-500 text-white p-4 flex items-center justify-center">
          <h1 className="text-2xl font-bold">{note.caption}</h1>
        </div>

        {note.tests.map((test, index) => (
          <div
            key={index}
            className={`p-5 m-0 text-green-900 ${
              index === 0 ? "bg-green-100" : "bg-green-200"
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">{test.question}</h2>

            {Object.entries(test.options).map(([key, value]) => (
              <label key={key} className="block mb-1">
                <input
                  type="radio"
                  name={`test-${index}`}
                  value={value}
                  onChange={() =>
                    setSelectedOptions((prev) => ({
                      ...prev,
                      [test.question]: value,
                    }))
                  }
                />
                {value}
              </label>
            ))}
          </div>
        ))}
        {loading ? (
          <div className="flex justify-center items-center h-[100vh]">
            <BarLoader width={100} height={25} color="#38a169" />
          </div>
        ) : (
          <button
            type="submit"
            className="px-4 w-full bg-green-600 py-2 text-white rounded text-xl "
          >
            Submit
          </button>
        )}
      </form>
      <Transition appear show={showSignUpPrompt} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setShowSignUpPrompt(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Sign Up
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Sign up to earn Graduation hats for your answered questions
                    to be motivated to consume and retain more knowledge.
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
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </motion.div>
  );
};

export default NoteTestPage;
