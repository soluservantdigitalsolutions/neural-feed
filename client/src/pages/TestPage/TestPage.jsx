import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Transition, Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const TestPage = () => {
  const { feedId } = useParams();
  const [feed, setFeed] = useState(null);
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState({
    correctAnswers: 0,
    totalQuestions: 0,
  });
  const [selectedOptions, setSelectedOptions] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/upload/feeds/${feedId}`
        );
        setFeed(response.data.singleFeed);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFeed();
  }, [feedId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
     setLoading(true);


    try {
      const response = await axios.post(
        "http://localhost:3000/api/upload/updateComprehensionAndHats",
        {
          selectedOptions,
          feedId: feed._id,
        },
        {
          withCredentials: true,
        }
      );

      // Calculate the number of correct answers
      let correctAnswers = 0;
      let totalQuestions = 0;

      for (let i = 0; i < feed.tests.length; i++) {
        const test = feed.tests[i];
        const selectedOption = selectedOptions[test.question];
        if (selectedOption && selectedOption === test.answer) {
          correctAnswers++;
        }
        totalQuestions++;
      }

      // Update the result state
      setResult({
        correctAnswers,
        totalQuestions,
      });

      // Open the dialog
      setOpen(true);
    } catch (err) {
      // Handle the error here
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add this function to handle the "Go Home" button click
  const handleGoHome = () => {
    navigate("/");
  };

  const handleReFeed = () => {
    navigate(`/feeds/${feedId}`);
  };

  if (!feed) {
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
          <h1 className="text-2xl font-bold">{feed.caption}</h1>
        </div>

        {feed.tests.map((test, index) => (
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
      <Transition appear show={open} as={Fragment}>
        <Dialog
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
          }}
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setOpen(false)}
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
                Test Result
              </Dialog.Title>

              {result.correctAnswers === result.totalQuestions ? (
                <>
                  <p className=" text-gray-500">
                    <b className="text-green-600 text-xl">You're on fire!</b>{" "}
                    You'd be unstoppable if you keep going like this. You got{" "}
                    <b className="text-green-600 text-xl">
                      {" "}
                      {result.correctAnswers}
                    </b>{" "}
                    out of{" "}
                    <b className="text-green-600 text-xl">
                      {" "}
                      {result.totalQuestions}
                    </b>{" "}
                    questions right. Hence, you get{" "}
                    <b className="text-green-600 text-lg">
                      {" "}
                      {result.correctAnswers}
                    </b>{" "}
                    hats. Let's do some more shall we?
                  </p>
                  <button
                    type="button"
                    className="px-4 py-2 mt-2.5  font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={handleGoHome}
                  >
                    Continue
                  </button>
                </>
              ) : (
                <>
                  <p className=" text-gray-500">
                    You got{" "}
                    <b className="text-red-600 text-lg">
                      {" "}
                      {result.correctAnswers}
                    </b>{" "}
                    out of{" "}
                    <b className="text-green-600 text-lg">
                      {" "}
                      {result.totalQuestions}
                    </b>{" "}
                    questions right.{" "}
                    <b className="text-green-600 text-lg">
                      With Persistence, You can do it!.
                    </b>{" "}
                    Go back to feed your neurons and try again
                  </p>
                  <button
                    type="button"
                    className="px-4 py-2 mt-2.5 font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={handleReFeed}
                  >
                    Re-Feed
                  </button>
                </>
              )}
            </div>
          </div>
        </Dialog>
      </Transition>
    </motion.div>
  );
};

export default TestPage;
