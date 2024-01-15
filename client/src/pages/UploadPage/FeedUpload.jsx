// Upload.jsx
import { useEffect, useState } from "react";
import Dropzone from "../../components/DropZone/Dropzone";
import SubmitBtn from "../../components/SubmitButton/SubmitBtn";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";
import axios from "axios";
import UploadVideo from "../../utils/upload";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import { categories, richTextEditorModules } from "../../utils/modules";

const FeedUpload = () => {
  const [caption, setCaption] = useState("");
  const [desc, setDesc] = useState("");
  const [videoFile, setVideoFile] = useState("");
  const [success, setSuccess] = useState("");
  const [feedPreview, setFeedPreview] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const userData = currentUser.user;
  const [loading, setLoading] = useState(false);
  const [tests, setTests] = useState([
    { question: "", options: { A: "", B: "", C: "", D: "" }, answer: "" },
  ]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    // Revoke the old feed preview Blob URL
    return () => URL.revokeObjectURL(feedPreview);
  }, [feedPreview]);

  const navigate = useNavigate();

  const addTest = () => {
    setTests([
      ...tests,
      { question: "", options: { A: "", B: "", C: "", D: "" }, answer: "" },
    ]);
  };

  const updateTest = (index, updatedTest) => {
    const updatedTests = tests.map((test, i) =>
      i === index ? updatedTest : test
    );
    setTests(updatedTests);
  };

  const removeTest = (index) => {
    const newTests = [...tests];
    newTests.splice(index, 1);
    setTests(newTests);
  };

  console.log(tests);

  // Upload.jsx
  const handleSubmit = async (e) => {
    setLoading(true);

    e.preventDefault();
    const url = await UploadVideo(videoFile);
    const data = {
      caption,
      video: url,
      description: desc,
      category,
      tests,
    };

    try {
      await axios.post(
        "https://neural-feed-backend-2yg8.onrender.com//api/upload/feeds",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setLoading(false);
      setSuccess("Video Uploaded Successfully");
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  if (loading)
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <BarLoader width={100} height={25} color="#38a169" />
      </div>
    );

  return (
    <div
      className="  MainFormCard border p-5 rounded flex justify-center  flex-col gap-2.5 shadow-xl m-5 "
      style={
        {
          // position: 'absolute',
          // top: '50%',
          // left: '50%',
          // transform: 'translate(-50%, -50%)',
        }
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="UploadTitle ">
          <h1 className="text-xl font-bold">Upload Your Neural Feed</h1>
        </div>
        <div className="UploadVideoDiv flex flex-col lg:flex-row gap-5">
          <div className="VideoDropZoneDiv flex   ">
            {feedPreview ? (
              <>
                <video
                  src={feedPreview}
                  className=" rounded transition  h-full flex self-center justify-center items-center"
                  controls
                ></video>
              </>
            ) : (
              <>
                <Dropzone
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setVideoFile(file);
                    setFeedPreview(URL.createObjectURL(file));
                  }}
                />
              </>
            )}
          </div>
          <div className="VideoUploadDetailsDiv w-full flex flex-col gap-5">
            <div className="captionDiv">
              <h1 className="Caption font-semibold">Caption</h1>
              <input
                type="text"
                name="caption"
                id=""
                onChange={(e) => setCaption(e.target.value)}
                className="  outline-none border rounded p-3 w-full"
              />
            </div>
            <div className="captionDiv">
              <h1 className="Caption font-semibold">Description</h1>
              <ReactQuill
                value={desc}
                onChange={setDesc}
                modules={richTextEditorModules} // Pass the custom modules to ReactQuill
                className="resize-none h-screen outline-none  rounded  w-full "
              />
            </div>
            {tests.map((test, index) => (
              <div
                key={index}
                className="border mt-20 p-5 rounded-md shadow-md"
              >
                <h1
                  className={`Caption font-semibold text-center text-2xl text-green-600`}
                >
                  Test {index + 1}
                </h1>
                <input
                  type="text"
                  placeholder="Question..."
                  value={test.question}
                  onChange={(e) =>
                    updateTest(index, { ...test, question: e.target.value })
                  }
                  className="  outline-none border rounded p-3 w-full"
                />
                <h1 className={`Caption font-semibold`}>Option A</h1>
                <input
                  type="text"
                  value={test.options.A}
                  onChange={(e) =>
                    updateTest(index, {
                      ...test,
                      options: { ...test.options, A: e.target.value },
                    })
                  }
                  className="  outline-none border rounded p-3 w-full"
                />
                <h1 className={`Caption font-semibold`}>Option B</h1>
                <input
                  type="text"
                  value={test.options.B}
                  onChange={(e) =>
                    updateTest(index, {
                      ...test,
                      options: { ...test.options, B: e.target.value },
                    })
                  }
                  className="  outline-none border rounded p-3 w-full"
                />
                <h1 className={`Caption font-semibold`}>Option C</h1>
                <input
                  type="text"
                  value={test.options.C}
                  onChange={(e) =>
                    updateTest(index, {
                      ...test,
                      options: { ...test.options, C: e.target.value },
                    })
                  }
                  className="  outline-none border rounded p-3 w-full"
                />
                <h1 className={`Caption font-semibold`}>Option D</h1>
                <input
                  type="text"
                  value={test.options.D}
                  onChange={(e) =>
                    updateTest(index, {
                      ...test,
                      options: { ...test.options, D: e.target.value },
                    })
                  }
                  className="  outline-none border rounded p-3 w-full"
                />
                <h1 className={`Caption font-semibold`}>Answer</h1>
                <input
                  type="text"
                  value={test.answer}
                  onChange={(e) =>
                    updateTest(index, { ...test, answer: e.target.value })
                  }
                  className="  outline-none border rounded p-3 w-full"
                />
                <button
                  type="button"
                  className="border bg-red-600 mt-2 text-white rounded-md p-2.5"
                  onClick={() => removeTest(index)}
                >
                  Remove Test
                </button>
              </div>
            ))}
            <button
              type="button"
              className="border bg-green-600 text-white rounded-md p-2.5"
              onClick={addTest}
            >
              Add Test
            </button>
            <div className="captionDiv">
              <h1 className="Caption font-semibold">Category</h1>
              <select
                name="category"
                id=""
                onChange={(e) => setCategory(e.target.value)}
                className="  outline-none border rounded p-3 w-full"
              >
                <option value="">Select a category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="ActionButtonsDiv flex gap-2 ">
              <SecondaryButton SecondaryButtonText="Discard" />
              <SubmitBtn ButtonText="Feed" />
            </div>
          </div>
        </div>
      </form>
      {success && (
        <div className="  bg-green-300 border-2 border-green-500 ">
          {success}
        </div>
      )}
    </div>
  );
};

export default FeedUpload;
